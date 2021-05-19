<template>
  <div>
    <div class="circle-wrap">
      <div
        class="circle"
        :style="{
          cursor: cursorValue,
        }"
      >
        {{ cursorValue }}
      </div>
    </div>
    <div>
      手型
      <span style="font-weight: 500; color: red"
        >cursor: {{ cursorValue }}</span
      >
    </div>
    <div class="el-radio-group">
      <div
        class="radio"
        v-for="(ov, index) in cursors"
        :key="index"
        :label="ov"
        @click="temp(ov, index)"
        :class="{ bg: index === creIndex }"
      >
        {{ ov }}
      </div>
    </div>

    <div class="language-css extra-class">
      <pre
        class="language-css"
        style="margin-bottom: 30px"
      ><code ref="css"></code></pre>
    </div>
  </div>
</template>

<script>
import Prism from "prismjs";
export default {
  name: "handleShape",
  data () {
    return {
      creIndex: 0,
      cursorValue: "pointer",
      cursors: [
        "pointer", "auto", "text", "default",
        "none", "help", "progress", "wait",
        "cell", "crosshair", "vertical-text", "alias",
        "copy", "no-drop", "not-allowed", "grab",
        "grabbing", "all-scroll", "move", "col-resize",
        "row-resize", "n-resize", "se-resize", "s-resize",
        "ns-resize", "e-resize", "w-resize", "ne-resize",
        "nw-resize", "sw-resize", "ew-resize", "nesw-resize",
        "nwsw-resize", "zoom-in", "zoom-out"
      ]
    }
  },
  watch: {
    cursorValue () {
      this.updateCss();
    },
  },
  methods: {
    updateCss () {
      this.$refs["css"].innerHTML = Prism.highlight(
        `cursor: ${this.cursorValue}`,
        Prism.languages.css
      );
    },
    temp (ov, index) {
      this.cursorValue = ov
      this.creIndex = index
    }
  },
  mounted () {
    this.updateCss();
  }
}
</script>

<style lang="scss" scoped>
.circle-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0 20px 0;
  .circle {
    width: 100px;
    height: 100px;
    background: #42b983;
    border-radius: 100%;
    text-align: center;
    line-height: 100px;
    color: #fff;
    font-size: 20px;
    white-space: wrap;
    word-wrap: break-word;
  }
}
.bg {
  background-color: rgba(0, 0, 0, 0.1);
}
@media screen and (min-width: 960px) {
  .el-radio-group {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0 20px 0;
    .radio {
      width: 15%;
      margin-right: 15px;
      margin-bottom: 5px;
      text-align: center;
      padding: 10px;
      border-radius: 4px;
      &:hover {
        cursor: default;
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .el-radio-group {
    display: flex;
    flex-wrap: wrap;
    margin: 20px 0 20px 0;
    .radio {
      width: 20%;
      margin-right: 35px;
      margin-bottom: 25px;
    }
  }
}
</style>