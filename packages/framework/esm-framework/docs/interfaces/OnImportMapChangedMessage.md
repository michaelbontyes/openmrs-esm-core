[@openmrs/esm-framework](../API.md) / OnImportMapChangedMessage

# Interface: OnImportMapChangedMessage

## Hierarchy

- [`OmrsServiceWorkerMessage`](OmrsServiceWorkerMessage.md)<``"onImportMapChanged"``\>

  ↳ **`OnImportMapChangedMessage`**

## Table of contents

### Properties

- [importMap](OnImportMapChangedMessage.md#importmap)
- [type](OnImportMapChangedMessage.md#type)

## Properties

### importMap

• **importMap**: [`ImportMap`](ImportMap.md)

#### Defined in

[packages/framework/esm-offline/src/service-worker-messaging.ts:24](https://github.com/openmrs/openmrs-esm-core/blob/master/packages/framework/esm-offline/src/service-worker-messaging.ts#L24)

___

### type

• **type**: ``"onImportMapChanged"``

#### Inherited from

[OmrsServiceWorkerMessage](OmrsServiceWorkerMessage.md).[type](OmrsServiceWorkerMessage.md#type)

#### Defined in

[packages/framework/esm-offline/src/service-worker-messaging.ts:19](https://github.com/openmrs/openmrs-esm-core/blob/master/packages/framework/esm-offline/src/service-worker-messaging.ts#L19)