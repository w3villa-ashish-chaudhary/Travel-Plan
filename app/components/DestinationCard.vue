<template>
  <div class="destination-card" :class="{ 'in-itinerary': inItinerary }">
    <div class="card-image-wrapper">
      <img
        :src="destination.image"
        :alt="destination.name"
        class="card-image"
        loading="lazy"
      />
      <div class="card-rating">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
        >
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
          />
        </svg>
        {{ destination.rating }}
      </div>
    </div>

    <div class="card-body">
      <div class="card-header">
        <h3 class="card-title">{{ destination.name }}</h3>
        <span class="card-country">{{ destination.country }}</span>
      </div>

      <p class="card-description">{{ destination.description }}</p>

      <div class="card-meta">
        <div class="meta-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
          </svg>
          {{ destination.avgTemp }}
        </div>
        <div class="meta-item">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
          </svg>
          {{ destination.bestSeason }}
        </div>
      </div>

      <div class="card-highlights">
        <span
          v-for="h in destination.highlights"
          :key="h"
          class="highlight-tag"
          >{{ h }}</span
        >
      </div>

      <button
        class="add-btn"
        :class="{ added: inItinerary }"
        :disabled="inItinerary"
        @click="$emit('add', destination)"
      >
        <svg
          v-if="!inItinerary"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        {{ inItinerary ? "In Itinerary" : "Add to Itinerary" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Destination } from "~/data/destinations";

defineProps<{
  destination: Destination;
  inItinerary: boolean;
}>();

defineEmits<{
  add: [destination: Destination];
}>();
</script>

<style scoped>
.destination-card {
  background: var(--color-surface);
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid var(--color-border);
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
  display: flex;
  flex-direction: column;
}

.destination-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
}

.destination-card.in-itinerary {
  border-color: var(--color-primary);
}

.card-image-wrapper {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.destination-card:hover .card-image {
  transform: scale(1.05);
}

.card-rating {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0, 0, 0, 0.65);
  color: #fbbf24;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 4px;
  backdrop-filter: blur(4px);
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.card-header {
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex-wrap: wrap;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text);
  margin: 0;
}

.card-country {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.card-description {
  color: var(--color-text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-meta {
  display: flex;
  gap: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  font-weight: 500;
}

.card-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.highlight-tag {
  padding: 4px 10px;
  background: var(--color-primary-bg);
  color: var(--color-primary);
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.add-btn {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.1s;
  background: var(--color-primary);
  color: #fff;
  font-family: inherit;
}

.add-btn:hover:not(:disabled) {
  background: var(--color-primary-hover);
  transform: scale(1.02);
}

.add-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.add-btn.added {
  background: var(--color-success);
  cursor: default;
}
</style>
