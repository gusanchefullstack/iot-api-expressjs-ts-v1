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
  location?: string;
  description?: string;
  organizationId: string;
}

export interface SiteUpdateInput {
  name?: string;
  location?: string;
  description?: string;
  organizationId?: string;
}

// MeasuringPoint interfaces
export interface MeasuringPointInput {
  name: string;
  description?: string;
  coordinates?: string;
  siteId: string;
}

export interface MeasuringPointUpdateInput {
  name?: string;
  description?: string;
  coordinates?: string;
  siteId?: string;
}

// Board interfaces
export interface BoardInput {
  name: string;
  serialNumber?: string;
  model?: string;
  description?: string;
  measuringPointId: string;
}

export interface BoardUpdateInput {
  name?: string;
  serialNumber?: string;
  model?: string;
  description?: string;
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