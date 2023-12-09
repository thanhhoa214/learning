import {
  component$,
  QRL,
  Resource,
  useResource$,
  useStore,
  useStyles$,
  useTask$,
} from '@builder.io/qwik';

export interface QuiIconProps {
  /**
   * Check the [Figma Icon Foundation](https://www.figma.com/file/FqZh0B6XPAwJHPge8wlBqW/Design-System-Foundation?node-id=42%3A0) to see all packages
   * @type {Package}
   */
  package: string;
  /**
   * Must use the icon included inside `package`
   * @type {IconType<Package>}
   */
  name: string;
  /**
   * Size of the icon in rem
   * @example `1` (16px as default), `1.5` (24px)
   */
  size?: string | number;
  /**
   * will rotate the icon infinitely or not
   */
  loading?: boolean;

  onClick$?: QRL<() => void>;
}
export type RequiredIconProps = Required<QuiIconProps>;

// TODO: Ask team for re-render when props change?
export const QuiIcon = component$((props: QuiIconProps) => {
  useStyles$(rotateAnimationStyle);
  const store = useStore<QuiIconProps>({ ...props });

  useTask$(({ track }) => {
    track(() => props.package);
    track(() => props.name);

    store.package = props.package;
    store.name = props.name;
  });

  const svgResource = useResource$<string>(async ({ track, cleanup }) => {
    track(() => store.package);
    track(() => store.name);

    const abortController = new AbortController();
    cleanup(() => abortController.abort('cleanup'));

    const { size, loading } = { ...defaultProps, ...props };

    const response = await fetch(`~/assets/icons/${props.package}/${props.name}.svg`, {
      signal: abortController.signal,
    });
    let svgAsText = await response.text();
    // Add attributes
    const attributesString = getSvgAttributesString(size, loading);
    svgAsText = svgAsText.replace('<svg', `<svg ${attributesString}`);
    return svgAsText;
  });

  return (
    <Resource
      value={svgResource}
      onRejected={() => <span>?</span>}
      onResolved={(svgAsText) => {
        return (
          <span
            dangerouslySetInnerHTML={svgAsText}
            class={`qui-icon inline-flex items-center justify-center ${
              props.onClick$ && 'cursor-pointer'
            }`}
            onClick$={props.onClick$}></span>
        );
      }}></Resource>
  );
});

export const defaultProps: Partial<QuiIconProps> = {
  size: 1,
  loading: false,
};

export const rotateAnimationStyle = `.rotate-animation { animation: rotate 1s linear infinite }
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;

export const getSvgAttributesString = (
  sizeInRem: number | string | null | undefined,
  loading = false
) => {
  const customClass = loading && 'class="rotate-animation"';
  const customStyle = sizeInRem && `style="width: ${sizeInRem}rem; height: ${sizeInRem}rem"`;
  const attrAsString = `${customClass ?? ''} ${customStyle ?? ''}`;
  return attrAsString;
};
