import { CollectionPreType } from '../'
import { Computed } from 'cerebral'

export default function visibleKeys
( collection: CollectionPreType
) : any {
  const { collectionPath, draftPath, filterPath } = collection.paths
  const sort = collection.sort

  return Computed
  ( { items: `${collectionPath}.**`
    , afilter: filterPath
    , selectedKey: `${draftPath}.key`
    }
  , ( { items, afilter, selectedKey } ) => {
      const filter = afilter && afilter.toLowerCase ()
      const list =
      Object.keys ( items )
      .filter
      ( key => ! filter
               || items [ key ].name.toLowerCase ().indexOf ( filter ) >= 0
      )
      .sort
      ( ( keyA, keyB ) => sort ( items [ keyA ], items [ keyB ] )
      )
      if ( selectedKey && list.indexOf ( selectedKey ) < 0 ) {
        // Always show edited item (also if it is not saved yet)
        list.unshift ( selectedKey )
      }
      return list
    }
  )
}
