<template>
  <portal v-if="isOpen" to="modal">
    <div
      class="modal show"
      tabindex="-1"
      role="dialog"
      :style="{ display: isOpen ? 'block' : 'none' }"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button type="button" class="close" @click="closeModal">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot name="modal-body">
              <p>Modal body text goes here.</p>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                @click="closeModal"
              >
                No
              </button>
              <button
                type="button"
                class="btn btn-primary"
                @click="confirmModal"
              >
                Yes
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </portal>
</template>

<script>
/* eslint-disable vue/require-default-prop */

export default {
  props: {
    modalTitle: {
      default: "Modal Title",
      type: String,
    },
    isOpen: {
      type: Boolean,
      default: false,
      required: true,
    },
    onRequestClose: {
      type: Function,
    },
    onConfirm: {
      type: Function,
    },
  },
  methods: {
    closeModal() {
      this.$emit("onRequestClose");
    },
    confirmModal() {
      this.$emit("onConfirm");
    },
  },
};
</script>
