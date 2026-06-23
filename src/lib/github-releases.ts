export type ProductId = 'easy-restaurant' | 'mi-inventario';

/** Repositorio de releases por producto */
export const PRODUCT_RELEASE_REPOS: Record<ProductId, string> = {
  'easy-restaurant': 'MarvinZzvla/EasyRestaurant-Releases',
  'mi-inventario': 'MarvinZzvla/MiInventarioOffiline-Releases',
};

/** Respaldo si la API de GitHub no responde durante el build */
const FALLBACK_EXE_URLS: Record<ProductId, string> = {
  'easy-restaurant':
    'https://github.com/MarvinZzvla/EasyRestaurant-Releases/releases/download/v1.0.6/Easy-Restaurant-Setup-1.0.6.exe',
  'mi-inventario':
    'https://github.com/MarvinZzvla/MiInventarioOffiline-Releases/releases/download/v1.0.4/Mi-Inventario-Offline-Setup-1.0.4.exe',
};

interface GithubReleaseAsset {
  name: string;
  browser_download_url: string;
}

interface GithubRelease {
  assets: GithubReleaseAsset[];
}

async function fetchLatestExeUrl(repo: string): Promise<string | null> {
  const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'Resoria-Landing-Page',
    },
  });

  if (!response.ok) return null;

  const release = (await response.json()) as GithubRelease;
  const exe = release.assets.find((asset) => asset.name.toLowerCase().endsWith('.exe'));
  return exe?.browser_download_url ?? null;
}

/** Obtiene la URL del .exe del último release publicado de cada producto */
export async function resolveProductDownloadUrls(): Promise<Record<ProductId, string>> {
  const entries = await Promise.all(
    (Object.entries(PRODUCT_RELEASE_REPOS) as [ProductId, string][]).map(async ([id, repo]) => {
      const url = (await fetchLatestExeUrl(repo)) ?? FALLBACK_EXE_URLS[id];
      return [id, url] as const;
    }),
  );

  return Object.fromEntries(entries) as Record<ProductId, string>;
}
