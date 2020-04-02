/**
 * 动画垂直滚动到页面指定位置
 * @param { Number } currentY 当前位置
 * @param { Number } targetY 目标位置
 */
import {number} from "prop-types";

function scrollAnimation(scrollDom:HTMLElement, targetY:number):void {
  // 获取当前位置方法
  // const currentY = document.documentElement.scrollTop || document.body.scrollTop

  // 计算需要移动的距离
  let _currentY:number = scrollDom.scrollTop;
  let maxScroll:number = scrollDom.scrollHeight - scrollDom.offsetHeight;
  let needScrollTop:number = targetY > maxScroll ? maxScroll - _currentY : Math.abs(targetY - _currentY);
  let symbol:number = _currentY > targetY ? -1 : 1;
  console.log(scrollDom.scrollTop, targetY);
  if (needScrollTop > 20) {
    setTimeout(() => {
        // 一次调用滑动帧数，每次调用会不一样
      scrollDom.scrollTop += 10 * symbol;
      // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
      scrollAnimation(scrollDom, targetY)
    }, 1)
  }

}
export default scrollAnimation;
