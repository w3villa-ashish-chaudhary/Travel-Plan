import type { Destination } from '~/data/destinations'

export interface ItineraryItem {
  destination: Destination
  startDate: string
  endDate: string
  notes: string
  addedAt: number
}

const STORAGE_KEY = 'smart-travel-planner-itinerary'

function loadFromStorage(): ItineraryItem[] {
  if (import.meta.server) return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveToStorage(items: ItineraryItem[]) {
  if (import.meta.server) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

const itinerary = ref<ItineraryItem[]>([])
let initialized = false

export function useItinerary() {
  // Hydrate from localStorage once on the client
  if (import.meta.client && !initialized) {
    itinerary.value = loadFromStorage()
    initialized = true
  }

  function addDestination(destination: Destination) {
    if (itinerary.value.some((i) => i.destination.id === destination.id)) return false

    itinerary.value.push({
      destination,
      startDate: '',
      endDate: '',
      notes: '',
      addedAt: Date.now(),
    })
    saveToStorage(itinerary.value)
    return true
  }

  function removeDestination(destinationId: string) {
    itinerary.value = itinerary.value.filter((i) => i.destination.id !== destinationId)
    saveToStorage(itinerary.value)
  }

  function updateDates(destinationId: string, startDate: string, endDate: string) {
    const item = itinerary.value.find((i) => i.destination.id === destinationId)
    if (item) {
      item.startDate = startDate
      item.endDate = endDate
      saveToStorage(itinerary.value)
    }
  }

  function updateNotes(destinationId: string, notes: string) {
    const item = itinerary.value.find((i) => i.destination.id === destinationId)
    if (item) {
      item.notes = notes
      saveToStorage(itinerary.value)
    }
  }

  function isInItinerary(destinationId: string) {
    return itinerary.value.some((i) => i.destination.id === destinationId)
  }

  function clearItinerary() {
    itinerary.value = []
    saveToStorage(itinerary.value)
  }

  const totalDays = computed(() => {
    return itinerary.value.reduce((total, item) => {
      if (item.startDate && item.endDate) {
        const start = new Date(item.startDate)
        const end = new Date(item.endDate)
        const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
        return total + Math.max(0, diff)
      }
      return total
    }, 0)
  })

  return {
    itinerary: readonly(itinerary),
    addDestination,
    removeDestination,
    updateDates,
    updateNotes,
    isInItinerary,
    clearItinerary,
    totalDays,
  }
}
