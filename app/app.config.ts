export default defineAppConfig({
  ui: {
    colors: {
      primary: "purple-heart",
    },
    modal: {
      slots: {
        content: "!rounded-2xl",
        overlay: "fixed inset-0 bg-black/70",
      },
    },
    button: {
      slots: {
        base: ["rounded-xl w-full cursor-pointer "],
      },
      variants: {
        size: {
          xs: {
            base: "px-4 py-1.5 text-xs gap-1.5 font-medium justify-center ",
            leadingIcon: "size-5",
            leadingAvatarSize: "2xs",
            trailingIcon: "size-5",
          },
          sm: {
            base: "px-4 py-3 text-sm gap-1.5 font-medium justify-center ",
            leadingIcon: "size-5",
            leadingAvatarSize: "2xs",
            trailingIcon: "size-5",
          },
          md: {
            base: "px-4 py-3 text-base gap-1.5 font-semibold justify-center ",
            leadingIcon: "size-5",
            leadingAvatarSize: "2xs",
            trailingIcon: "size-5",
          },
        },
      },
      compoundVariants: [
        {
          color: "primary",
          variant: "solid",
          class:
            "text-inverted bg-primary hover:bg-primary/75 active:bg-primary/75 disabled:bg-gray/80 disabled:text-white aria-disabled:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        },
      ],
    },
    breadcrumb: {
      variants: {
        active: {
          true: {
            link: "text-black text-xs md:text-sm font-medium ",
          },
          false: {
            link: "text-dove-gray text-xs md:text-sm font-normal",
          },
        },
      },
    },
    separator: {
      slots: {
        container: "font-normal text-dove-gray  flex",
        label: "text-xs",
      },
    },
    input: {
      slots: {
        root: "w-full",
        base: [" rounded-xl "],
      },
      variants: {
        size: {
          md: {
            base: "px-4 py-3 text-sm md:text-base gap-1.5 ",
            leading: "ps-2.5",
            trailing: "pe-2.5",
            leadingIcon: "size-5",
            leadingAvatarSize: "2xs",
            trailingIcon: "size-5",
          },
        },
        variant: {
          outline: " ring-black/20",
        },
      },
    },
    pinInput: {
      slots: {
        root: "w-full p-0",
        base: ["rounded-xl border-0"],
      },
      variants: {
        size: {
          "2xl": {
            base: "size-10 text-2xl",
          },
        },
        variant: {
          outline:
            "text-highlighted bg-default ring ring-inset ring-accented flex-1 min-h-[70px]",
        },
      },
    },
    formField: {
      slots: {
        label: "text-xs md:text-sm",
      },
    },
    table: {
      slots: {
        th: "text-center",
        td: "text-center",
      },
    },
  },
});
