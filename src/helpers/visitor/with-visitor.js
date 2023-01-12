import React, { useEffect, useMemo, useRef } from 'react';
import { EventEmitter2 as Emitter } from 'eventemitter2';

const withWisitor = (WrappedComponent) => ({ accept = [], ...restProps }) => {
  // console.log(accept)
  const ref = useRef(null);

  const emitter = useMemo(
    () => new Emitter(),
    [],
  );

  const ctx = useMemo(
    () => ({
      emit: (...args) => emitter.emit(...args),
      ref,
    }),
    [emitter],
  );

  useEffect(() => {
    const unmountCbs = [];

    for (const visitor of accept) {
      unmountCbs.push(visitor.visit({ emitter, ref }));
    }

    return () => unmountCbs.forEach((cb) => cb?.());
  }, [accept, emitter]);

  return (
    <WrappedComponent
      {...restProps}
      ctx={ctx}
    />
  );
};

export default withWisitor;
