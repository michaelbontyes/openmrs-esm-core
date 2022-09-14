/** @module @category Extension */
import { Lifecycle } from "@openmrs/esm-globals";
import { mountRootParcel, Parcel } from "single-spa";
import { getExtensionNameFromId, getExtensionRegistration } from "./extensions";
import { checkStatus, getCustomProps } from "./helpers";
import { updateInternalExtensionStore } from "./store";

export interface CancelLoading {
  (): void;
}

/**
 * Mounts into a DOM node (representing an extension slot)
 * a lazy-loaded component from *any* frontend module
 * that registered an extension component for this slot.
 */
export async function renderExtension(
  domElement: HTMLElement,
  extensionSlotName: string,
  extensionSlotModuleName: string,
  extensionId: string,
  renderFunction: (lifecycle: Lifecycle) => Lifecycle = (x) => x,
  additionalProps: Record<string, any> = {}
): Promise<Parcel | null> {
  const extensionName = getExtensionNameFromId(extensionId);
  const extensionRegistration = getExtensionRegistration(extensionId);
  let parcel: Parcel | null = null;

  if (domElement) {
    if (!extensionRegistration) {
      throw Error(
        `Couldn't find extension '${extensionName}' to attach to '${extensionSlotName}'`
      );
    }

    const { load, online, offline, meta, moduleName } = extensionRegistration;

    if (checkStatus(online, offline)) {
      const { default: result, ...lifecycle } = await load();
      parcel = mountRootParcel(renderFunction(result ?? lifecycle), {
        ...getCustomProps(online, offline),
        ...additionalProps,
        _meta: meta,
        _extensionContext: {
          extensionId,
          extensionSlotName,
          extensionSlotModuleName,
          extensionModuleName: moduleName,
        },
        domElement,
      });

      updateInternalExtensionStore((state) => {
        const instance = {
          domElement,
          id: extensionId,
          slotName: extensionSlotName,
          slotModuleName: extensionSlotModuleName,
        };
        return {
          ...state,
          extensions: {
            ...state.extensions,
            [extensionName]: {
              ...state.extensions[extensionName],
              instances: [
                ...state.extensions[extensionName].instances,
                instance,
              ],
            },
          },
        };
      });
    }
  } else {
    console.warn(
      `Tried to render ${extensionId} into ${extensionSlotName} but no DOM element was available.`
    );
  }

  return parcel;
}
