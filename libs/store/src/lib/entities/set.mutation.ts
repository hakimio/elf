import {
  BaseEntityOptions,
  DefaultEntitiesRef,
  defaultEntitiesRef,
  EntitiesRecord,
  EntitiesRef,
  getEntityType,
  getIdKey,
  getIdType,
} from './entity.state';
import { OrArray } from '../core/types';
import { Reducer, Store } from '../core/store';
import { buildEntities } from './entity.utils';

/**
 *
 * Set entities in the store
 *
 * store.reduce(setEntities([entity, entity]))
 *
 */
export function setEntities<
  S extends EntitiesRecord,
  Ref extends EntitiesRef = DefaultEntitiesRef
>(
  entities: OrArray<getEntityType<S, Ref>>,
  options: BaseEntityOptions<Ref> = {}
): Reducer<S> {
  return function reducer(state: S, store: Store) {
    const { ref = defaultEntitiesRef } = options;
    const { entitiesKey, idsKey } = ref!;
    const { ids, asObject } = buildEntities<S, Ref>(
      ref as Ref,
      entities,
      getIdKey<getIdType<S, Ref>>(store)
    );

    return {
      ...state,
      [entitiesKey]: asObject,
      [idsKey]: ids,
    };
  };
}