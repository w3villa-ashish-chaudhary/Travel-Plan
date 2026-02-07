<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="toast-container">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="`toast-${toast.type}`"
        @click="dismiss(toast.id)"
      >
        <svg
          v-if="toast.type === 'success'"
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
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <svg
          v-else-if="toast.type === 'error'"
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
          <circle cx="12" cy="12" r="10" />
          <path d="m15 9-6 6" />
          <path d="m9 9 6 6" />
        </svg>
        <svg
          v-else
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
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </svg>
        <span>{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
const { toasts, dismiss } = useToast();
</script>

<style scoped>
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  flex-direction: column-reverse;
  gap: 8px;
  pointer-events: none;
}

.toast {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #fff;
  cursor: pointer;
  pointer-events: all;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  min-width: 280px;
  max-width: 400px;
}

.toast-success {
  background: var(--color-success);
}

.toast-error {
  background: var(--color-danger);
}

.toast-info {
  background: var(--color-primary);
}

.toast-enter-active {
  transition: all 0.3s ease;
}

.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(80px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(80px);
}

@media (max-width: 480px) {
  .toast-container {
    left: 16px;
    right: 16px;
    bottom: 16px;
  }
  .toast {
    min-width: unset;
    max-width: unset;
  }
}
</style>
