import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function unionEntitiesAsMap<
  T extends {
    entities: Record<string, any>[];
    UIEntities: Record<string | number, Record<string, any>>;
  }
>(
  idKey: keyof T['entities'][0] = 'id'
): OperatorFunction<T, Record<string, T['entities'][0] & T['UIEntities'][0]>> {
  return map((state: T) => {
    return Object.fromEntries<
      Record<string, T['entities'][0] & T['UIEntities'][0]>
    >(
      state.entities.map((entity) => {
        return [
          entity[idKey as string],
          {
            ...entity,
            ...state.UIEntities[entity[idKey as string]],
          },
        ];
      })
    );
  });
}
