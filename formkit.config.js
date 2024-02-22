import { generateClasses } from "@formkit/themes";

const config = {
  config: {
    classes: generateClasses({
      global: {
        wrapper: "space-y-2 mb-3 ",
            message: "bg-red-500 text-white text-center text-sm font-bold p-2 rounded-md uppercase",
            label: "block font-bold mb-1 text-lg text-white",
        input:'w-full p-3 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:border-2 focus:border-blue-500',
      },
        submit: {
          input:'$reset bg-blue-500 hover:bg-blue-600 text-white font-bold p-3 rounded-lg w-full uppercase mt-10'
      },
    }),
  },
};

export default config;
