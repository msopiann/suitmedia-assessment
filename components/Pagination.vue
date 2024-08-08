<template>
  <div class="flex items-center gap-x-1 justify-center my-14">
    <button
      @click="changePage(1)"
      :disabled="page === 1"
      class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 py-2 px-3 rounded-lg"
    >
      <<
    </button>
    <button
      @click="changePage(page - 1)"
      :disabled="page === 1"
      class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 py-2 px-3 rounded-lg"
    >
      <
    </button>

    <!-- Page Number Buttons -->
    <button
      v-for="p in pageRange"
      :key="p"
      @click="changePage(p)"
      :class="{
        'bg-orange-600 text-white': p === page,
        'bg-white': p !== page,
      }"
      class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 py-2 px-3 rounded-lg"
    >
      {{ p }}
    </button>

    <button
      @click="changePage(page + 1)"
      :disabled="page === totalPages"
      class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 py-2 px-3 rounded-lg"
    >
      >
    </button>
    <button
      @click="changePage(totalPages)"
      :disabled="page === totalPages"
      class="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 py-2 px-3 rounded-lg"
    >
      >>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      required: true,
    },
    perPage: {
      type: Number,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.total / this.perPage);
    },
    pageRange() {
      const pages = [];
      const startPage = Math.max(1, this.page - 2);
      const endPage = Math.min(this.totalPages, this.page + 2);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    changePage(newPage) {
      if (newPage > 0 && newPage <= this.totalPages) {
        this.$emit("page-changed", newPage);
      }
    },
  },
};
</script>

<style scoped>
button:disabled {
  color: #ccc;
  cursor: not-allowed;
}
</style>
