<style scoped>
.big-wrapper {
  height: 100%;
}
.el-aside {
  height: 100%;
}
.main-content {
  background: #f0f2f5;
}
.el-header {
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.el-main {
  height: 100%;
  padding: 10px;
}
.content {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
}
#canvas {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.wrapper-box {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
  z-index: 2;
}
.opacity {
  opacity: 0;
}
</style>


<template>
  <el-container class="big-wrapper">
    <el-aside :width="menuSwitch">
      <menu-list></menu-list>
    </el-aside>
    <el-container class="main-content">
      <el-header>
        <header-dom> </header-dom>
      </el-header>
      <el-main>
        <div class="content" ref="content">
          <canvas id="canvas" ref="canvas"> </canvas>
          <div
            class="wrapper-box"
            :calss="route.path === '/home' ? 'opacity' : ''"
          >
            <transition name="fade" mode="out-in">
              <keep-alive>
                <router-view v-if="$route.meta.keepAlive"> </router-view>
              </keep-alive>
            </transition>
            <transition name="fade" mode="out-in">
              <router-view v-if="!$route.meta.keepAlive"> </router-view>
            </transition>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MenuList from "./leftlist.vue";
import HeaderDom from "./header.vue";
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      menuSwitch: (state) => (state.menuSwitch ? "240px" : "64px"),
    }),
    route() {
      return this.$route;
    },
  },
  components: {
    MenuList,
    HeaderDom,
  },
  mounted() {},
  methods: {
    init() {
      let config = {
        z: -1, // z-index
        a: 0.6, // alpha
        s: 90, // size
      };

      var canvas = this.$refs.canvas,
        g2d = canvas.getContext("2d"),
        pr = window.devicePixelRatio || 1,
        width = this.$refs.content.clientWidth - 20,
        height = this.$refs.content.clientHeight - 20,
        f = config.s,
        q,
        t,
        m = Math,
        r = 0,
        pi = m.PI * 2,
        cos = m.cos,
        random = m.random;
      canvas.width = width * pr;
      canvas.height = height * pr;
      g2d.scale(pr, pr);
      g2d.globalAlpha = config.a;

      function redraw() {
        g2d.clearRect(0, 0, width, height);
        q = [
          { x: 0, y: height * 0.7 + f },
          { x: 0, y: height * 0.7 - f },
        ];
        while (q[1].x < width + f) draw(q[0], q[1]);
        g2d.font = "48px serif";
        g2d.fillText("etoDigital", width / 2 - 100, 240);
      }
      function draw(i, j) {
        g2d.beginPath();
        g2d.moveTo(i.x, i.y);
        g2d.lineTo(j.x, j.y);
        var k = j.x + (random() * 2 - 0.25) * f,
          n = line(j.y);
        g2d.lineTo(k, n);
        g2d.closePath();
        r -= pi / -50;
        g2d.fillStyle =
          "#" +
          (
            ((cos(r) * 127 + 128) << 16) |
            ((cos(r + pi / 3) * 127 + 128) << 8) |
            (cos(r + (pi / 3) * 2) * 127 + 128)
          ).toString(16);
        g2d.fill();
        q[0] = q[1];
        q[1] = { x: k, y: n };
      }

      function line(p) {
        t = p + (random() * 2 - 1.1) * f;
        return t > height || t < 0 ? line(p) : t;
      }
      redraw();
      this.$refs.canvas.onclick = redraw;
    },
  },
};
</script>