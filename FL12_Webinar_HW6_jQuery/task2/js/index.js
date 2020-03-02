$(document).ready(function () {
  const $list = $(".list");
  const $input = $("#add-input");
  const $add = $("#add-submit");

  // const todos = [
  //   { text: "Buy milk", done: false },
  //   { text: "Play with dog", done: true },
  //   { text: "Do homework", done: false },
  //   { text: "Learn english", done: false },
  //   { text: "Watch cartoons", done: true }
  // ];
  // localStorage.setItem('todos', JSON.stringify(todos));

  $.fn.todolist = function (action, todoObj) {
    let todos = Array.from(JSON.parse(localStorage.getItem('todos')));

    if (action === 'save') {
      todos.unshift(todoObj);
    } else if (action === 'get') {
      if (todos) {
        $(todos).each(function () {
          const newItem = $('<li>').addClass('item');
          if (this.done) {
            $('<span>').addClass('item-text done').text(this.text).appendTo(newItem);
          } else {
            $('<span>').addClass('item-text').text(this.text).appendTo(newItem);
          }
          $('<button>').addClass('item-remove').text('Remove').appendTo(newItem);
          $list.append(newItem);
        })
      }
    } else if (action === 'remove') {
      todos = jQuery.grep(todos, function (todo) {
        return todo.text != todoObj.text;
      })
    } else if (action === 'done') {
      $(todos).each(function () {
        if (this.text === todoObj.text) {
          this.done = true;
        }
      })
    }

    localStorage.setItem('todos', JSON.stringify(todos));
  };

  $list.todolist('get');

  $list.click(function (e) {
    const target = $(e.target);
    if (target.hasClass('item-remove')) {
      $.fn.todolist('remove', { text: target.prev().text() });
      target.parent().remove();
    } else if (target.hasClass('item-text')) {
      target.addClass('done');
      $.fn.todolist('done', { text: target.text() });
    }
  });

  $add.click(function (e) {
    e.preventDefault();
    if ($input.val() !== '') {
      const newItem = $('<li>').addClass('item');
      $('<span>').addClass('item-text').text($input.val()).appendTo(newItem);
      $('<button>').addClass('item-remove').text('Remove').appendTo(newItem);
      $list.prepend(newItem);
      $.fn.todolist('save', { text: $input.val(), done: false });
      $input.val('');
    }
  });

  $('#search-input').on('input', function (e) {
    const strToSearch = e.target.value.toLocaleLowerCase();
    $('.item-text').each(function () {
      if ($(this).text().toLocaleLowerCase().indexOf(strToSearch) < 0) {
        $(this).parent().hide();
      } else {
        $(this).parent().show();
      }
    })
  })
});