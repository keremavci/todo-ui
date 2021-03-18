import { createLocalVue, mount } from '@vue/test-utils'
import TodoList from '@/components/TodoList.vue'
import VueMaterial from 'vue-material'



describe('TodoList.vue', () => {
  let localVue;
  let wrapper;
  beforeAll(() => {
    localVue = createLocalVue();
    localVue.use(VueMaterial);
    wrapper = mount(TodoList, { localVue });
  });

  it('renders props.msg when passed', () => {
    const msg = 'new message';
    wrapper.setProps({ msg });
    expect(wrapper.props().msg).toMatch(msg);
  });

  it('Must be text area', () => {
    const todoInput = wrapper.find('input[id="todoInput"]');
    expect(todoInput.exists()).toBe(true);
  })

  it('Must be add button', () => {
    const addButton = wrapper.find('button[id="addButton"]');
    expect(addButton.exists()).toBe(true);
  })

  it('Must be list', () => {
    const addButton = wrapper.find('ul[id="toDoList"]');
    expect(addButton.exists()).toBe(true);
  })

})