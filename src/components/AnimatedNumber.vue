<template>
  {{ displayNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }}
</template>

<script>
import { ref, watch } from 'vue';

export default {
  name: 'AnimatedNumber',
  props: {
    number: {
      type: Number,
      required: true,
    }
  },
  setup: function (props) {
    const displayNumber = ref(0);
    const interval = ref(null);

    animate();

    watch(() => props.number, () => {
      clearInterval(interval.value);

      animate();
    });

    return {
      displayNumber,
    }

    function animate() {
      interval.value = setInterval(() => {
        if (Math.floor(displayNumber.value) === Math.floor(props.number)) {
          displayNumber.value = props.number;
          clearInterval(interval.value);
          return;
        }

        let change = (props.number - displayNumber.value) / 10;
        change = change >= 0 ? Math.ceil(change) : Math.floor(change);

        displayNumber.value = displayNumber.value + change;
      }, 35);
    }
  }
}
</script>