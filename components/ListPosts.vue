<template>
  <div class="py-24 relative container w-[80%] mx-auto">
    <div class="w-full max-w-7xl mx-auto mb-8 px-4 md:px-8">
      <div
        class="flex flex-col lg:flex-row lg:items-center max-lg:gap-4 justify-between w-full"
      >
        <div class="w-1/3">
          <span class="text-sm text-gray-700">
            Showing <span class="font-semibold">{{ showingFrom }}</span> to
            <span class="font-semibold">{{ showingTo }}</span> of
            <span class="font-semibold">{{ total }}</span>
          </span>
        </div>
        <div class="flex gap-4 ml-auto">
          <div>
            <label for="perPage" class="mr-2">Show per page:</label>
            <select
              v-model.number="perPage"
              @change="updatePerPage(perPage)"
              id="perPage"
              class="w-fit rounded-full border-r-8 px-4 py-1 text-sm"
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
          <div>
            <label for="sort" class="mr-2">Sort by:</label>
            <select
              v-model="sort"
              @change="updateSort(sort)"
              id="sort"
              class="w-fit rounded-full border-r-8 px-4 py-1 text-sm"
            >
              <option value="-published_at">Newest</option>
              <option value="published_at">Oldest</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white p-4 rounded shadow"
      >
        <img
          :src="post.small_image[0].url"
          :alt="'Thumbnail for ' + post.title"
          class="lazyload w-full h-48 object-cover rounded mb-4"
        />
        <h3 class="text-sm text-gray-500">
          {{
            new Date(post.published_at).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          }}
        </h3>
        <h2 class="text-lg font-bold mb-2 card-title">{{ post.title }}</h2>
      </div>
    </div>

    <Pagination
      :total="total"
      :per-page="perPage"
      :page="page"
      @page-changed="handlePageChange"
    />
  </div>
</template>

<script>
import axios from "axios";
import Pagination from "./Pagination.vue";

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      posts: [],
      sort: localStorage.getItem("sort") || "-published_at",
      perPage: parseInt(localStorage.getItem("perPage")) || 10,
      total: 0,
      page: parseInt(this.$route.query.page) || 1,
    };
  },
  watch: {
    "$route.query.page"(newPage) {
      this.page = parseInt(newPage) || 1;
      this.fetchPosts();
    },
    "$route.query.sort"(newSort) {
      this.sort = newSort || "-published_at";
      this.fetchPosts();
    },
    "$route.query.perPage"(newPerPage) {
      this.perPage = parseInt(newPerPage) || 10;
      this.fetchPosts();
    },
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    showingFrom() {
      return (this.page - 1) * this.perPage + 1;
    },
    showingTo() {
      return Math.min(this.page * this.perPage, this.total);
    },
  },
  methods: {
    async fetchPosts() {
      const response = await axios.get(
        "https://suitmedia-backend.suitdev.com/api/ideas",
        {
          params: {
            "page[number]": this.page,
            "page[size]": this.perPage,
            "append[]": ["small_image", "medium_image"],
            sort: this.sort,
          },
        }
      );

      this.posts = response.data.data;
      this.total = response.data.meta.total;
    },
    handlePageChange(newPage) {
      this.page = newPage;
      this.updateQueryParams();
    },
    updatePerPage(newPerPage) {
      this.perPage = newPerPage;
      localStorage.setItem("perPage", newPerPage);
      this.updateQueryParams();
    },
    updateSort(newSort) {
      this.sort = newSort;
      localStorage.setItem("sort", newSort);
      this.updateQueryParams();
    },
    updateQueryParams() {
      this.$router.push({
        query: {
          ...this.$route.query,
          page: this.page,
          sort: this.sort,
          perPage: this.perPage,
        },
      });
    },
  },
};
</script>

<style scoped>
.card-title {
  line-height: 1.2rem;
  line-clamp: 3;
  height: 3.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
