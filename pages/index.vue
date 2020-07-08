<template>
  <div class="container">
    <h2>Book List</h2>
    <form method="post" @submit.prevent="create">
      <div class="form-group">
        <label for="exampleInputEmail1">Title</label>
        <input v-model="title" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Content</label>
        <input v-model="content" type="text" class="form-control" />
      </div>
      <button class="btn btn-primary" type="submit">Create</button>
    </form>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(list, index) in book.lists" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ list.title }}</td>
          <td>
            <button
              class="btn btn-sm btn-danger"
              @click="toggleModal('remove', list.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ConfirmModal
      :is-open="modalType == 'remove'"
      modal-title="Remove Book"
      @onRequestClose="toggleModal('')"
      @onConfirm="remove"
    >
      <template v-slot:modal-body
        >Are you sure want to remove this book?</template
      >
    </ConfirmModal>
  </div>
</template>

<script>
/* eslint-disable object-shorthand */
// import { mapMutations } from "vuex";
export default {
  middleware: "auth",
  data: function () {
    return {
      title: "",
      content: "",
      modalType: "",
      id: null,
    };
  },
  computed: {
    book: function () {
      return this.$store.state.book;
    },
  },
  mounted: function () {
    this.$store.dispatch("book/fetchBook");
  },
  methods: {
    create: async function () {
      await this.$store.dispatch("book/createBook", {
        title: this.title,
        content: this.content,
      });
      this.title = "";
      this.content = "";
    },
    remove: async function () {
      await this.$store.dispatch("book/deleteBook", this.id);
      this.toggleModal("", null);
    },
    toggleModal: function (type, id) {
      this.modalType = type;
      this.id = id;
    },
  },
};
</script>
