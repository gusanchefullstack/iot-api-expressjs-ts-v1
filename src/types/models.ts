// Organization interfaces
export interface OrganizationInput {
  name: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zipcode: string;
}

export interface OrganizationUpdateInput {
  name?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  zipcode?: string;
}

// Site interfaces
export interface SiteInput {
  name: string;
  country: string;
  state: string;
  city: string;
  address: string;
  zipcode: string;
  organizationId: string;
}

export interface SiteUpdateInput {
  name?: string;
  country?: string;
  state?: string;
  city?: string;
  address?: string;
  zipcode?: string;
  organizationId?: string;
}

// MeasuringPoint interfaces
export interface MeasuringPointInput {
  name: string;
  latitude: number;
  longitude: number;
  siteId: string;
}

export interface MeasuringPointUpdateInput {
  name?: string;
  latitude?: number;
  longitude?: number;
  siteId?: string;
}

// Enum for BoardStatus
export enum BoardStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  MAINTENANCE = 'MAINTENANCE'
}

// Board interfaces
export interface BoardInput {
  name: string;
  serialNumber?: string;
  model?: string;
  description?: string;
  boardStatus: BoardStatus;
  measuringPointId: string;
}

export interface BoardUpdateInput {
  name?: string;
  serialNumber?: string;
  model?: string;
  description?: string;
  boardStatus?: BoardStatus;
  measuringPointId?: string;
}

// Sensor interfaces
export interface SensorInput {
  name: string;
  type: string;
  unit?: string;
  model?: string;
  serialNumber?: string;
  description?: string;
  boardId: string;
}

export interface SensorUpdateInput {
  name?: string;
  type?: string;
  unit?: string;
  model?: string;
  serialNumber?: string;
  description?: string;
  boardId?: string;
} 