import HTMLNode from "../../../graphics/nodes/HTMLNode/HTMLNode";


const exampleNode = {
  id: "1",
  label: "Person",
  properties: {
    firstName : "Ravi",
    lastName: "M"
  }
}

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
export default {
  title: 'Graphics/Node/HTMLNode',
  component: HTMLNode,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal = {
  args: {
    node: exampleNode,
    // accentColor: "#999"
  },
};
 