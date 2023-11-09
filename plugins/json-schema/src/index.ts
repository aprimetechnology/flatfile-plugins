import { Flatfile } from '@flatfile/api'
import { FlatfileEvent, FlatfileListener } from '@flatfile/listener'
import { configureSpace } from '@flatfile/plugin-space-configure'
import {
  ModelToSheetConfig,
  PartialWorkbookConfig,
  generateSetup,
} from './setup.factory'

export function configureSpaceWithJsonSchema(
  models?: ModelToSheetConfig[],
  options?: {
    workbookConfig?: PartialWorkbookConfig
    debug?: boolean
  },
  callback?: (
    event: FlatfileEvent,
    workbookIds: string[],
    tick: (progress?: number, message?: string) => Promise<Flatfile.JobResponse>
  ) => any | Promise<any>
) {
  return async function (listener: FlatfileListener) {
    listener.use(configureSpace(await generateSetup(models, options), callback))
  }
}

export type { SetupFactory } from '@flatfile/plugin-space-configure'
export * from './setup.factory'