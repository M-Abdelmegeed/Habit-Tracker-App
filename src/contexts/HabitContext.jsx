import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  setDoc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "./AuthContext";
import { defaultHabits } from "../config/theme";

const HabitContext = createContext();

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
};

export const HabitProvider = ({ children }) => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [completions, setCompletions] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch habits from Firestore
  const fetchHabits = useCallback(async () => {
    if (!user) {
      setHabits([]);
      setLoading(false);
      return;
    }

    try {
      const habitsRef = collection(db, "users", user.uid, "habits");
      const q = query(habitsRef, orderBy("createdAt", "asc"));
      const snapshot = await getDocs(q);

      const habitsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // If no habits exist, initialize with defaults
      if (habitsData.length === 0) {
        await initializeDefaultHabits();
      } else {
        setHabits(habitsData);
      }
    } catch (error) {
      console.error("Error fetching habits:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Initialize default habits for new users
  const initializeDefaultHabits = async () => {
    if (!user) return;

    try {
      const habitsRef = collection(db, "users", user.uid, "habits");
      const newHabits = [];

      for (const habit of defaultHabits) {
        const docRef = await addDoc(habitsRef, {
          ...habit,
          createdAt: new Date().toISOString(),
          isActive: true,
        });
        newHabits.push({ id: docRef.id, ...habit, isActive: true });
      }

      setHabits(newHabits);
    } catch (error) {
      console.error("Error initializing default habits:", error);
    }
  };

  // Fetch completions for a specific month
  const fetchCompletions = useCallback(
    async (year, month) => {
      if (!user) return;

      try {
        const completionsRef = collection(db, "users", user.uid, "completions");
        const snapshot = await getDocs(completionsRef);

        const completionsData = {};
        snapshot.docs.forEach((doc) => {
          completionsData[doc.id] = doc.data();
        });

        setCompletions(completionsData);
      } catch (error) {
        console.error("Error fetching completions:", error);
      }
    },
    [user],
  );

  // Add a new habit
  const addHabit = async (habitData) => {
    if (!user) return;

    try {
      const habitsRef = collection(db, "users", user.uid, "habits");
      const docRef = await addDoc(habitsRef, {
        ...habitData,
        createdAt: new Date().toISOString(),
        isActive: true,
      });

      const newHabit = { id: docRef.id, ...habitData, isActive: true };
      setHabits((prev) => [...prev, newHabit]);
      return newHabit;
    } catch (error) {
      console.error("Error adding habit:", error);
      throw error;
    }
  };

  // Update an existing habit
  const updateHabit = async (habitId, updates) => {
    if (!user) return;

    try {
      const habitRef = doc(db, "users", user.uid, "habits", habitId);
      await updateDoc(habitRef, updates);

      setHabits((prev) =>
        prev.map((h) => (h.id === habitId ? { ...h, ...updates } : h)),
      );
    } catch (error) {
      console.error("Error updating habit:", error);
      throw error;
    }
  };

  // Delete a habit
  const deleteHabit = async (habitId) => {
    if (!user) return;

    try {
      const habitRef = doc(db, "users", user.uid, "habits", habitId);
      await deleteDoc(habitRef);

      setHabits((prev) => prev.filter((h) => h.id !== habitId));
    } catch (error) {
      console.error("Error deleting habit:", error);
      throw error;
    }
  };

  // Toggle habit completion for a specific date
  const toggleCompletion = async (habitId, date) => {
    if (!user) return;

    try {
      const dateStr =
        typeof date === "string" ? date : date.toISOString().split("T")[0];
      const completionRef = doc(db, "users", user.uid, "completions", dateStr);

      const currentCompletion = completions[dateStr] || { habits: {} };
      const isCompleted = !currentCompletion.habits?.[habitId];

      const updatedCompletions = {
        ...currentCompletion,
        date: dateStr,
        habits: {
          ...currentCompletion.habits,
          [habitId]: isCompleted,
        },
      };

      await setDoc(completionRef, updatedCompletions);

      setCompletions((prev) => ({
        ...prev,
        [dateStr]: updatedCompletions,
      }));

      return isCompleted;
    } catch (error) {
      console.error("Error toggling completion:", error);
      throw error;
    }
  };

  // Update mental state (mood/motivation) for a date
  const updateMentalState = async (date, mood, motivation) => {
    if (!user) return;

    try {
      const dateStr =
        typeof date === "string" ? date : date.toISOString().split("T")[0];
      const completionRef = doc(db, "users", user.uid, "completions", dateStr);

      const currentCompletion = completions[dateStr] || { habits: {} };
      const updatedCompletions = {
        ...currentCompletion,
        date: dateStr,
        mood,
        motivation,
      };

      await setDoc(completionRef, updatedCompletions, { merge: true });

      setCompletions((prev) => ({
        ...prev,
        [dateStr]: updatedCompletions,
      }));
    } catch (error) {
      console.error("Error updating mental state:", error);
      throw error;
    }
  };

  // Check if a habit is completed for a specific date
  const isHabitCompleted = (habitId, date) => {
    const dateStr =
      typeof date === "string" ? date : date.toISOString().split("T")[0];
    return completions[dateStr]?.habits?.[habitId] || false;
  };

  // Get mental state for a specific date
  const getMentalState = (date) => {
    const dateStr =
      typeof date === "string" ? date : date.toISOString().split("T")[0];
    const completion = completions[dateStr];
    return {
      mood: completion?.mood || null,
      motivation: completion?.motivation || null,
    };
  };

  // Calculate statistics for a habit
  const getHabitStats = (habitId, year, month) => {
    let completed = 0;
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
      if (completions[dateStr]?.habits?.[habitId]) {
        completed++;
      }
    }

    const habit = habits.find((h) => h.id === habitId);
    const goal = habit?.goal || 30;

    return {
      completed,
      goal,
      percentage: Math.round((completed / goal) * 100),
    };
  };

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  useEffect(() => {
    if (user) {
      const now = new Date();
      fetchCompletions(now.getFullYear(), now.getMonth());
    }
  }, [user, fetchCompletions]);

  const value = {
    habits,
    completions,
    loading,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleCompletion,
    updateMentalState,
    isHabitCompleted,
    getMentalState,
    getHabitStats,
    fetchCompletions,
    refreshHabits: fetchHabits,
  };

  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
};

export default HabitContext;
