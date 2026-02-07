<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <svg
        class="search-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
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
      <input
        type="text"
        :value="modelValue"
        placeholder="Search destinations, countries, or highlights…"
        class="search-input"
        @input="
          $emit('update:modelValue', ($event.target as HTMLInputElement).value)
        "
      />
      <button
        v-if="modelValue"
        class="clear-btn"
        @click="$emit('clear')"
        aria-label="Clear search"
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
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </div>
    <div v-if="isSearching" class="search-status">
      <span class="spinner" /> Searching…
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string;
  isSearching: boolean;
}>();

defineEmits<{
  "update:modelValue": [value: string];
  clear: [];
}>();
</script>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 16px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 14px 48px 14px 48px;
  border: 2px solid var(--color-border);
  border-radius: 16px;
  background: var(--color-surface);
  font-size: 1rem;
  color: var(--color-text);
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  font-family: inherit;
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px var(--color-primary-alpha);
}

.search-input::placeholder {
  color: var(--color-text-muted);
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    color 0.2s,
    background 0.2s;
}

.clear-btn:hover {
  color: var(--color-text);
  background: var(--color-border);
}

.search-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 12px;
  color: var(--color-text-muted);
  font-size: 0.875rem;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
