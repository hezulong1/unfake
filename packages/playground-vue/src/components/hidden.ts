import { h, type CSSProperties } from 'vue';

interface HiddenProps {
  focusable?: boolean;
}

export function HiddenImpl(props: HiddenProps) {
  const focusable = props.focusable ?? false;
  const style: CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0, 0, 0, 0)',
    whiteSpace: 'nowrap',
    border: '0',
  };
  if (!focusable) {
    style.display = 'none';
  }
  return h('div', { style });
}

HiddenImpl.props = { focusable: Boolean };
