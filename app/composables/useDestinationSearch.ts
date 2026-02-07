import { destinations, type Destination } from '~/data/destinations'

export function useDestinationSearch() {
  const query = ref('')
  const isSearching = ref(false)

  // Debounced search with simulated async delay for UX
  const results = ref<Destination[]>([])

  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  function search(q: string) {
    query.value = q

    if (debounceTimer) clearTimeout(debounceTimer)

    if (!q.trim()) {
      results.value = []
      isSearching.value = false
      return
    }

    isSearching.value = true

    debounceTimer = setTimeout(() => {
      const lower = q.toLowerCase().trim()
      results.value = destinations.filter(
        (d) =>
          d.name.toLowerCase().includes(lower) ||
          d.country.toLowerCase().includes(lower) ||
          d.description.toLowerCase().includes(lower) ||
          d.highlights.some((h) => h.toLowerCase().includes(lower))
      )
      isSearching.value = false
    }, 300)
  }

  function clearSearch() {
    query.value = ''
    results.value = []
    isSearching.value = false
  }

  return {
    query,
    results,
    isSearching,
    search,
    clearSearch,
  }
}
