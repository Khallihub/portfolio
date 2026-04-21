"use client";

import { useState, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Eye, EyeOff, Loader2, Save, RotateCcw } from "lucide-react";

interface Section {
  id: string;
  type: string;
  title: string;
  order: number;
  isVisible: boolean;
}

function SortableItem({
  section,
  onToggle,
}: {
  section: Section;
  onToggle: (id: string, current: boolean) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 0,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex items-center gap-4 bg-[#1E293B] border border-[#334155] p-4 rounded-2xl mb-3 transition-all ${
        isDragging ? "shadow-2xl border-[#22C55E]/40" : "hover:border-[#22C55E]/20"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing p-2 text-[#475569] hover:text-[#94A3B8] transition-colors"
      >
        <GripVertical size={20} />
      </div>

      <div className="flex-1">
        <p className="font-archivo font-semibold">{section.title}</p>
        <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest mt-0.5">
          Type: {section.type}
        </p>
      </div>

      <button
        onClick={() => onToggle(section.id, section.isVisible)}
        className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
          section.isVisible
            ? "bg-[#22C55E]/10 border-[#22C55E]/20 text-[#22C55E] hover:bg-[#22C55E]/20"
            : "bg-red-400/10 border-red-400/20 text-red-400 hover:bg-red-400/20"
        }`}
        title={section.isVisible ? "Hide section" : "Show section"}
      >
        {section.isVisible ? <Eye size={18} /> : <EyeOff size={18} />}
      </button>
    </div>
  );
}

export default function SectionsPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetch("/api/sections")
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
        setLoading(false);
      });
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        const newArray = arrayMove(items, oldIndex, newIndex);
        return newArray.map((item, index) => ({ ...item, order: index + 1 }));
      });
      setHasChanges(true);
    }
  };

  const toggleVisibility = async (id: string, current: boolean) => {
    setSections((items) =>
      items.map((i) => (i.id === id ? { ...i, isVisible: !current } : i))
    );
    setHasChanges(true);
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      // Parallel updates for visibility
      const visibilityPromises = sections.map((s) =>
        fetch("/api/sections", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: s.id, isVisible: s.isVisible }),
        })
      );

      // Bulk update for order
      const orderPromise = fetch("/api/sections", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orders: sections.map((s) => ({ id: s.id, order: s.order })),
        }),
      });

      await Promise.all([...visibilityPromises, orderPromise]);
      setHasChanges(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const resetChanges = () => {
    setLoading(true);
    fetch("/api/sections")
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
        setHasChanges(false);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-[#22C55E] animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="font-archivo text-3xl font-bold mb-2">Layout & Sections</h1>
          <p className="text-[#94A3B8]">
            Drag to reorder sections on the homepage or toggle visibility.
          </p>
        </div>

        {hasChanges && (
          <div className="flex items-center gap-3">
            <button
              onClick={resetChanges}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#334155] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
            >
              <RotateCcw size={18} /> Reset
            </button>
            <button
              id="save-sections"
              onClick={saveChanges}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#22C55E] text-[#0F172A] font-bold hover:bg-[#16A34A] disabled:opacity-50 transition-all cursor-pointer shadow-lg shadow-[#22C55E]/20"
            >
              {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save size={18} />}
              Save Changes
            </button>
          </div>
        )}
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sections} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {sections.map((section) => (
              <SortableItem
                key={section.id}
                section={section}
                onToggle={toggleVisibility}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-10 p-6 rounded-2xl bg-blue-400/5 border border-blue-400/10 text-blue-400 text-sm flex items-start gap-4">
        <div className="p-2 rounded-lg bg-blue-400/10">
          <Save size={18} />
        </div>
        <p className="leading-relaxed">
          Changes to visibility and order are saved only when you click the <strong>Save Changes</strong> button. 
          The order here directly reflects the visual order of sections on your homepage.
        </p>
      </div>
    </div>
  );
}
