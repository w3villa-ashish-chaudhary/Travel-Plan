<template>
  <div v-if="itinerary.length === 0" class="empty-state">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="empty-icon"
    >
      <path
        d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"
      />
      <circle cx="12" cy="13" r="3" />
    </svg>
    <h3>No destinations yet</h3>
    <p>Search for destinations above and add them to build your itinerary!</p>
  </div>

  <div v-else class="itinerary-list">
    <TransitionGroup name="itinerary">
      <div
        v-for="item in itinerary"
        :key="item.destination.id"
        class="itinerary-item"
      >
        <div class="item-header">
          <img
            :src="item.destination.image"
            :alt="item.destination.name"
            class="item-thumb"
            loading="lazy"
          />
          <div class="item-info">
            <h4 class="item-name">{{ item.destination.name }}</h4>
            <span class="item-country">{{ item.destination.country }}</span>
          </div>
          <button
            class="remove-btn"
            @click="$emit('remove', item.destination.id)"
            aria-label="Remove destination"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
          </button>
        </div>

        <div class="date-section">
          <div class="date-field">
            <label :for="`start-${item.destination.id}`">Start Date</label>
            <input
              :id="`start-${item.destination.id}`"
              type="date"
              :value="item.startDate"
              @change="
                $emit(
                  'updateDates',
                  item.destination.id,
                  ($event.target as HTMLInputElement).value,
                  item.endDate,
                )
              "
            />
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="arrow-icon"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
          <div class="date-field">
            <label :for="`end-${item.destination.id}`">End Date</label>
            <input
              :id="`end-${item.destination.id}`"
              type="date"
              :value="item.endDate"
              :min="item.startDate || undefined"
              @change="
                $emit(
                  'updateDates',
                  item.destination.id,
                  item.startDate,
                  ($event.target as HTMLInputElement).value,
                )
              "
            />
          </div>
        </div>

        <div v-if="item.startDate && item.endDate" class="duration-badge">
          {{ calculateDays(item.startDate, item.endDate) }} days
        </div>

        <div class="notes-section">
          <label :for="`notes-${item.destination.id}`">Notes</label>
          <textarea
            :id="`notes-${item.destination.id}`"
            :value="item.notes"
            placeholder="Add travel notes, reminders…"
            rows="2"
            @input="
              $emit(
                'updateNotes',
                item.destination.id,
                ($event.target as HTMLTextAreaElement).value,
              )
            "
          />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import type { ItineraryItem } from "~/composables/useItinerary";

defineProps<{
  itinerary: readonly ItineraryItem[];
}>();

defineEmits<{
  remove: [id: string];
  updateDates: [id: string, start: string, end: string];
  updateNotes: [id: string, notes: string];
}>();

function calculateDays(start: string, end: string): number {
  const s = new Date(start);
  const e = new Date(end);
  return Math.max(
    0,
    Math.ceil((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)),
  );
}
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 48px 24px;
  color: var(--color-text-muted);
}

.empty-icon {
  margin-bottom: 16px;
  opacity: 0.4;
}

.empty-state h3 {
  margin: 0 0 8px;
  color: var(--color-text-secondary);
  font-size: 1.2rem;
}

.empty-state p {
  margin: 0;
  font-size: 0.9rem;
  max-width: 360px;
  margin-inline: auto;
}

.itinerary-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.itinerary-item {
  background: var(--color-surface);
  border: 2px solid var(--color-border);
  border-radius: 16px;
  padding: 20px;
  transition: box-shadow 0.2s;
}

.itinerary-item:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.item-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
}

.item-thumb {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
}

.item-country {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.remove-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition:
    color 0.2s,
    background 0.2s;
  display: flex;
  align-items: center;
}

.remove-btn:hover {
  color: var(--color-danger);
  background: var(--color-danger-bg);
}

.date-section {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin-bottom: 12px;
}

.arrow-icon {
  color: var(--color-text-muted);
  flex-shrink: 0;
  margin-bottom: 8px;
}

.date-field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.date-field label,
.notes-section label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.date-field input,
.notes-section textarea {
  padding: 10px 12px;
  border: 2px solid var(--color-border);
  border-radius: 10px;
  font-size: 0.9rem;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: inherit;
  transition: border-color 0.2s;
}

.date-field input:focus,
.notes-section textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.duration-badge {
  display: inline-block;
  padding: 4px 12px;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 12px;
}

.notes-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.notes-section textarea {
  resize: vertical;
  min-height: 60px;
}

/* Transition animations */
.itinerary-enter-active {
  transition: all 0.3s ease;
}

.itinerary-leave-active {
  transition: all 0.3s ease;
}

.itinerary-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.itinerary-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.itinerary-move {
  transition: transform 0.3s ease;
}

@media (max-width: 480px) {
  .date-section {
    flex-direction: column;
    align-items: stretch;
  }
  .arrow-icon {
    display: none;
  }
}
</style>
