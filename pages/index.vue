<template>
  <div class="container">
    <h2>Book List</h2>
    <form method="post" @submit.prevent="isEdit ? update() : create()">
      <div class="form-group">
        <label for="exampleInputEmail1">Title</label>
        <input v-model="title" type="text" class="form-control" />
      </div>
      <div class="form-group">
        <label for="exampleInputEmail1">Content</label>
        <input v-model="content" type="text" class="form-control" />
      </div>
      <div v-if="!isEdit">
        <button class="btn btn-primary" type="submit">Create</button>
      </div>
      <div v-else>
        <button class="btn btn-info" @click="resetState">Cancel</button>
        <button class="btn btn-primary" type="submit">Save</button>
      </div>
    </form>
    <table class="table mt-2">
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
            <button class="btn btn-sm btn-warning" @click="toggleEdit(index)">
              Edit
            </button>
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
      isEdit: false,
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
      this.resetState();
    },
    update: async function () {
      await this.$store.dispatch("book/updateBook", {
        id: this.id,
        formData: {
          title: this.title,
          content: this.content,
        },
      });
      this.resetState();
    },
    remove: async function () {
      await this.$store.dispatch("book/deleteBook", this.id);
      this.resetState();
    },
    toggleModal: function (type, id) {
      this.modalType = type;
      this.id = id;
    },
    toggleEdit: function (idx) {
      // eslint-disable-next-line no-console
      this.title = this.book.lists[idx].title;
      this.content = this.book.lists[idx].content;
      this.id = this.book.lists[idx].id;
      this.isEdit = true;
    },
    resetState: function () {
      this.modalType = "";
      this.id = "";
      this.title = "";
      this.content = "";
      this.isEdit = false;
    },
  },
};
</script>
