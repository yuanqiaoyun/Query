function yqyOpenMenu(clickType, left, top, onMenuItemClick) {
    console.log(clickType);
    var html = ``
    if (!clickType) {
        //空白处右击
        html = `
    <div class="yqy-content-menu">
      <ul class="yqy-content-menu__ul">
        <li class="yqy-content-menu__li">
          <span class="yqy-content-menu__li-value">+新增目录</span>
        </li>
        <li class="yqy-content-menu__li" style="border-bottom: 1px solid gainsboro;">
          <span class="yqy-content-menu__li-value">+新增资料</span>
        </li>
        <li class="yqy-content-menu__li yqy-content-menu_blak-li">
          <span class="yqy-content-menu__li-value">重命名</span>
        </li>
        <li class="yqy-content-menu__li yqy-content-menu_blak-li">
          <span class="yqy-content-menu__li-value">删除</span>
        </li>
      </ul>
</div>
    `;
    } else {
        html = `
    <div class="yqy-content-menu">
      <ul class="yqy-content-menu__ul">
        <li class="yqy-content-menu__li">
          <span class="yqy-content-menu__li-value">+新增目录</span>
          <ul class="yqy-content-menu__sub">
            <li class="yqy-content-menu__sub-li">
              <span class="yqy-content-menu__li-value">新增同级目录</span>
            </li>
            <li class="yqy-content-menu__sub-li">
              <span class="yqy-content-menu__li-value">新增子目录</span>
            </li>
          </ul>
        </li>
        <li class="yqy-content-menu__li" style="border-bottom: 1px solid gainsboro;">
          <span class="yqy-content-menu__li-value">+新增资料</span>
        </li>
        <li class="yqy-content-menu__li">
          <span class="yqy-content-menu__li-value">重命名</span>
        </li>
        <li class="yqy-content-menu__li">
          <span class="yqy-content-menu__li-value">删除</span>
        </li>
      </ul>
    </div>
    `;
    }
    $(document.body).append(html);

    $('.yqy-content-menu__li').on('click', handleMenuItemClick);
    $('.yqy-content-menu__sub-li').on('click', handleMenuItemClick);
    console.log({ left, top });
    $('.yqy-content-menu').css({ left: left, top: top });
    $(document).on('click', function () {
        hideMenu();
    });

    function handleMenuItemClick(e) {
        e.stopPropagation();
        var value = $(this)
            .children('.yqy-content-menu__li-value')
            .text();
        onMenuItemClick && onMenuItemClick(value);
        hideMenu();
    }

    function hideMenu() {
        $('.yqy-content-menu').remove();
    }
}
