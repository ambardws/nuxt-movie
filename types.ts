export interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongsToCollection: BelongsToCollection;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdbId: string;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  poster_path: string;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  releaseDate: string;
  revenue: number;
  runtime: number;
  spokenLanguages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

interface SpokenLanguage {
  englishName: string;
  iso6391: string;
  name: string;
}

interface ProductionCountry {
  iso31661: string;
  name: string;
}

interface ProductionCompany {
  id: number;
  logoPath?: string;
  name: string;
  originCountry: string;
}

interface Genre {
  id: number;
  name: string;
}

interface BelongsToCollection {
  id: number;
  name: string;
  posterPath: string;
  backdropPath?: any;
}
