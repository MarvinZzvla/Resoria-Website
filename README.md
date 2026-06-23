# Resoria

**Software simple para hacer crecer tu negocio.**

Resoria desarrolla soluciones pensadas para dueños y equipos que necesitan herramientas claras, sin complicaciones. Esta landing presenta nuestra oferta de productos, precios y formas de contacto.

## Productos

### Easy Restaurant
Sistema para restaurantes, cafeterías, pizzerías, bares y food trucks. Centraliza mesas, comandas, cocina y caja en un solo lugar para servir más rápido y con menos errores.

### Mi Inventario
Software de control de stock para tiendas, bodegas, ferreterías, farmacias y almacenes. Registra entradas y salidas, recibe alertas de reposición y consulta reportes para tomar mejores decisiones.

## Modalidades

Cada producto está disponible en dos formatos:

- **Pago único** — un solo pago, instalación en tu equipo
- **Pago mensual** — acceso desde cualquier dispositivo, actualizaciones incluidas

También ofrecemos **prueba gratuita de 15 días** para que conozcas el software antes de comprar.

## Sitio web

Landing bilingüe (**español** e **inglés**) con:

- Presentación de productos y precios
- Páginas de detalle con beneficios, tutoriales y casos de éxito
- Comparativa entre pago único y pago mensual
- Formulario de contacto y métodos de pago
- Política de privacidad y términos de uso

## Contacto

Visita la sección de contacto en el sitio para solicitar información, una demo o adquirir un plan.

## Publicación

Sitio publicado en **https://resorias.com** (GitHub Pages + dominio personalizado).

El repositorio no incluye `dist/`; GitHub Actions compila y despliega al hacer push a `master`.

### Configurar DNS en GoDaddy (resorias.com)

Si al abrir **resorias.com** ves la página por defecto de **GoDaddy Airo**, el dominio raíz (`@`) aún apunta a GoDaddy, no a GitHub. El subdominio `www` puede estar bien configurado, pero GitHub redirige `www` → `resorias.com`, así que **debes corregir el registro `@`**.

#### 1. Desactivar Airo / sitio de GoDaddy

1. Entra en [godaddy.com](https://www.godaddy.com) → **Mis productos**.
2. En **resorias.com**, si aparece **Sitio web de GoDaddy** o **Airo**, desconéctalo o elimínalo del dominio (no lo uses como sitio principal).
3. Ve a **DNS** o **Administrar DNS** del dominio.

#### 2. Editar registros DNS

**Elimina** (o edita) los registros **A** de `@` que apunten a IPs de GoDaddy, por ejemplo:
- `13.248.243.5`
- `76.223.105.230`

**Crea 4 registros A** para `@` con las IPs de [GitHub Pages](https://docs.github.com/es/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain):

| Tipo | Nombre | Valor | TTL |
|------|--------|-------|-----|
| A | `@` | `185.199.108.153` | 600 (o 1 hora) |
| A | `@` | `185.199.109.153` | 600 |
| A | `@` | `185.199.110.153` | 600 |
| A | `@` | `185.199.111.153` | 600 |

**Subdominio `www`** — debe ser **CNAME** (no A):

| Tipo | Nombre | Valor |
|------|--------|-------|
| CNAME | `www` | `marvinzzvla.github.io` |

No uses «Reenvío de dominio» de GoDaddy hacia otra URL; eso impide que GitHub Pages funcione.

#### 3. Comprobar propagación

Tras guardar, espera 15–60 minutos (a veces hasta 24 h). En PowerShell:

```powershell
nslookup resorias.com
```

Debes ver las IPs `185.199.108.153` … `185.199.111.153`, **no** las de GoDaddy.

### En GitHub (solo una vez)

1. **Settings → Pages → Custom domain** → escribe `resorias.com` y guarda.
2. Espera la verificación DNS (puede tardar hasta 24 h).
3. Activa **Enforce HTTPS** cuando GitHub lo permita.
4. **Source** debe ser **GitHub Actions**.

© Resoria — Easy Restaurant & Mi Inventario
