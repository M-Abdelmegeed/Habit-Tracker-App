import { useState } from "react";
import { Plus } from "lucide-react";
import { useHabits } from "../../contexts/HabitContext";
import HabitCard from "./HabitCard";
import HabitForm from "./HabitForm";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Loading from "../ui/Loading";

const HabitList = () => {
  const { habits, loading, addHabit, updateHabit, deleteHabit } = useHabits();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleAddHabit = async (habitData) => {
    try {
      await addHabit(habitData);
      setIsFormOpen(false);
    } catch (error) {
      console.error("Failed to add habit:", error);
    }
  };

  const handleEditHabit = async (habitData) => {
    try {
      await updateHabit(editingHabit.id, habitData);
      setEditingHabit(null);
    } catch (error) {
      console.error("Failed to update habit:", error);
    }
  };

  const handleDeleteHabit = async () => {
    try {
      await deleteHabit(deleteConfirm.id);
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Failed to delete habit:", error);
    }
  };

  if (loading) {
    return <Loading message="Loading habits..." />;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-text-primary)]">
            My Habits
          </h1>
          <p className="text-[var(--color-text-secondary)] mt-1">
            Manage your habits - add, edit, or remove them
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus size={20} />
          Add Habit
        </Button>
      </div>

      {/* Habits Grid */}
      {habits.length === 0 ? (
        <div className="card text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
            No habits yet
          </h3>
          <p className="text-[var(--color-text-secondary)] mb-6">
            Start building better routines by adding your first habit.
          </p>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus size={20} />
            Add Your First Habit
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 [&>.card]:!mb-0">
          {habits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onEdit={setEditingHabit}
              onDelete={setDeleteConfirm}
            />
          ))}
        </div>
      )}

      {/* Add Habit Modal */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title="Add New Habit"
      >
        <HabitForm
          onSubmit={handleAddHabit}
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      {/* Edit Habit Modal */}
      <Modal
        isOpen={!!editingHabit}
        onClose={() => setEditingHabit(null)}
        title="Edit Habit"
      >
        {editingHabit && (
          <HabitForm
            habit={editingHabit}
            onSubmit={handleEditHabit}
            onCancel={() => setEditingHabit(null)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        title="Delete Habit"
      >
        <div className="text-center">
          <div className="text-5xl mb-4">{deleteConfirm?.icon}</div>
          <p className="text-[var(--color-text-primary)] mb-2">
            Are you sure you want to delete
          </p>
          <p className="text-xl font-semibold text-[var(--color-text-primary)] mb-4">
            "{deleteConfirm?.name}"?
          </p>
          <p className="text-[var(--color-text-muted)] text-sm mb-6">
            This action cannot be undone. All completion history for this habit
            will be lost.
          </p>
          <div className="flex gap-3">
            <Button
              variant="secondary"
              onClick={() => setDeleteConfirm(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteHabit}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HabitList;
