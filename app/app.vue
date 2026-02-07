<template>
  <div class="app">
    <NuxtRouteAnnouncer />

    <!-- Header -->
    <header class="app-header">
      <div class="container header-inner">
        <div class="logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path
              d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"
            />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Smart Travel Planner</span>
        </div>
        <div v-if="itinerary.length > 0" class="header-stats">
          <span class="stat">
            <svg
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
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {{ itinerary.length }}
            {{ itinerary.length === 1 ? "stop" : "stops" }}
          </span>
          <span v-if="totalDays > 0" class="stat">
            <svg
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
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
            {{ totalDays }} {{ totalDays === 1 ? "day" : "days" }}
          </span>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">Where will your next adventure take you?</h1>
        <p class="hero-subtitle">
          Search destinations, build your dream itinerary, and plan every detail
          of your trip.
        </p>
        <SearchBar
          :model-value="query"
          :is-searching="isSearching"
          @update:model-value="search"
          @clear="clearSearch"
        />
      </div>
    </section>

    <!-- Main Content -->
    <main class="container main-content">
      <!-- Search Results -->
      <section v-if="query.trim()" class="section">
        <h2 class="section-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          Search Results
          <span v-if="!isSearching" class="result-count"
            >({{ results.length }} found)</span
          >
        </h2>

        <div v-if="results.length > 0" class="destination-grid">
          <DestinationCard
            v-for="dest in results"
            :key="dest.id"
            :destination="dest"
            :in-itinerary="isInItinerary(dest.id)"
            @add="handleAdd"
          />
        </div>

        <div v-else-if="!isSearching" class="no-results">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="no-results-icon"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
            <path d="M8 11h6" />
          </svg>
          <p>
            No destinations match "<strong>{{ query }}</strong
            >"
          </p>
          <p class="hint">Try searching for a city, country, or landmark</p>
        </div>
      </section>

      <!-- Featured Destinations (when no search) -->
      <section v-else class="section">
        <h2 class="section-title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            />
          </svg>
          Featured Destinations
        </h2>
        <div class="destination-grid">
          <DestinationCard
            v-for="dest in featuredDestinations"
            :key="dest.id"
            :destination="dest"
            :in-itinerary="isInItinerary(dest.id)"
            @add="handleAdd"
          />
        </div>
      </section>

      <!-- Itinerary Section -->
      <section class="section itinerary-section">
        <div class="section-header">
          <h2 class="section-title">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
              />
            </svg>
            My Itinerary
            <span v-if="itinerary.length > 0" class="result-count"
              >({{ itinerary.length }})</span
            >
          </h2>
          <button
            v-if="itinerary.length > 0"
            class="clear-all-btn"
            @click="handleClearAll"
          >
            Clear All
          </button>
        </div>

        <ItineraryList
          :itinerary="itinerary"
          @remove="handleRemove"
          @update-dates="handleUpdateDates"
          @update-notes="handleUpdateNotes"
        />
      </section>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="container">
        <p>&copy; 2026 Smart Travel Planner &middot; Built with Nuxt 3 + Vue</p>
      </div>
    </footer>

    <ToastNotification />
  </div>
</template>

<script setup lang="ts">
import { destinations, type Destination } from "~/data/destinations";

const { query, results, isSearching, search, clearSearch } =
  useDestinationSearch();
const {
  itinerary,
  addDestination,
  removeDestination,
  updateDates,
  updateNotes,
  isInItinerary,
  clearItinerary,
  totalDays,
} = useItinerary();
const { show } = useToast();

// Show 6 featured destinations when there's no search query
const featuredDestinations = computed(() => destinations.slice(0, 6));

function handleAdd(destination: Destination) {
  const added = addDestination(destination);
  if (added) {
    show(`${destination.name} added to your itinerary!`, "success");
  } else {
    show(`${destination.name} is already in your itinerary`, "info");
  }
}

function handleRemove(id: string) {
  const dest = itinerary.value.find((i) => i.destination.id === id);
  removeDestination(id);
  if (dest) {
    show(`${dest.destination.name} removed from itinerary`, "info");
  }
}

function handleUpdateDates(id: string, start: string, end: string) {
  updateDates(id, start, end);
}

function handleUpdateNotes(id: string, notes: string) {
  updateNotes(id, notes);
}

function handleClearAll() {
  clearItinerary();
  show("Itinerary cleared", "info");
}
</script>
