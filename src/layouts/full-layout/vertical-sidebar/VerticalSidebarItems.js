export default [
 // { header: "" }, // antes administración
 {  
  model: false,
  icon: "mdi-account",
  title: "Mi cuenta",
  to: "perfil",

}, 

{  
  model: false,
  icon: "fas fa-hand-spock",
  title: "Productores",
  to: "productores",
  
}, 
{  
  model: false,
  icon: "mdi-shopping",
  title: "Productos",
  to: "productos",
  
}, 
/*
 {
    group: "/tableros",
    model: false,
    icon: " fas fa-chart-line",
    title: "Tableros",
    children: [
      {
        icon: "mdi-adjust",
        title: "Indicadores",
        to: "indicadores",
      },
      /*
      {
        icon: "mdi-adjust",
        title: "Habilitaciones",
        to: "demographical",
      },
      {
        icon: "mdi-adjust",
        title: "Liquidaciones",
        to: "minimal",
      },
      {
        icon: "mdi-adjust",
        title: "Compras",
        to: "overview",
      },
      {
        icon: "mdi-adjust",
        title: "Ventas",
        to: "ecommerce",
      }, 
    ],
  },
 
  { // produccion
    group: "/produccion",
    model: false,
    icon: "ti-crown",
    title: "Produccion",
    children: [
      {
        icon: "mdi-adjust",
        title: "Producción",
        to: "produccion",
      },
      {
        icon: "mdi-adjust",
        title: "Parte diario",
        to: "partesDiariosProduccion",
      },      
      
    ],
  },// fin produccion
  
  { // servicios
    group: "/servicios",
    model: false,
    icon: "mdi-gauge",
    title: "Servicios",
    children: [
    
      { // transporte
        group: "/servicios/transporte",
        model: false,
        icon: "fas fa-truck",
        title: "Transporte",
        children: [
          
          {
            icon: "mdi-adjust",
            title: "Pagos",
            to: "pagos",
          }                  
          
        ],
      },// fin transporte

     
/*
      {
        icon: "mdi-adjust",
        title: "Zegado",
        to: "zegado",
      },

      {
        icon: "mdi-adjust",
        title: "Paleado",
        to: "paleado",
      }
   
    ],
  },// fin servicios

  { // Ventas>
    group: "/ventas",
    model: false,
    icon: "mdi-cash-multiple",
    title: "Ventas",
    children: [      
      {
        icon: "mdi-adjust",
        title: "Ventas",
        to: "ventas",
      }     
      
    ],
  },// Ventas>
  { // agricultores
    group: "/agricultores",
    model: false,
    icon: "fab fa-pagelines",
    title: "Agricultores",
    children: [
      {
        icon: "mdi-account",
        title: "Agricultores",
        to: "agricultores",
      },
      {
        icon: "mdi-adjust",
        title: "Lotes",
        to: "lotes",
      },
      {
        icon: "mdi-adjust",
        title: "Arroz cáscara",
        to: "arrozcascara",
      }, 
      {
        icon: "ti-clipboard",
        title: "Habilitaciones",
        to: "habilitaciones",
      },     
          
      
    ],
  },// fin agricultores
  { // clientes
    group: "/clientes",
    model: false,
    icon: "mdi-account",
    title: "Clientes",
    children: [
      {
        icon: "mdi-adjust",
        title: "Clientes",
        to: "clientes",
      } ,
      {
        icon: "mdi-adjust",
        title: "Estados de cuentas",
        to: "estado_cuenta_cliente",
      }   
      
    ],
  },// clientes


  { // trabajadores
    group: "/trabajadores",
    model: false,
    icon: "fas fa-hand-spock",
    title: "Trabajadores",
    children: [
      {
        icon: "mdi-adjust",
        title: "Trabajadores",
        to: "trabajadores",
      }     
      
    ],
  },// fin trabajadores
  { // MANTENIMIENTO
    group: "/mantenimiento",
    model: false,
    icon: "fas fa-warehouse",
    title: "Mantenimiento",
    children: [
      {
        icon: "mdi-adjust",
        title: "Zonas",
        to: "zonas",
      },
      {
        icon: "mdi-adjust",
        title: "Variedades",
        to: "variedades",
      },
      {
        icon: "mdi-adjust",
        title: "Molinos",
        to: "molinos",
      },
      {
        icon: "mdi-adjust",
        title: "Vasijas",
        to: "vasijas",
      },
      {
        icon: "mdi-adjust",
        title: "Productos",
        to: "productos",
      },
      {
        icon: "mdi-adjust",
        title: "Vehículos",
        to: "vehiculos",
      },
         
      
    ],
  },// fin MANTENIMIENTO
  { // usuarios
    group: "/Accesos",
    model: false,
    icon: "fas fa-lock",
    title: "Accesos",
    children: [
      {
        icon: "mdi-adjust",
        title: "Usuarios",
        to: "usuarios",
      }     
      
    ],
  },// usuarios


  {
    header: "Apps",
  },
  {
    title: "Chat",
    icon: "mdi-comment-outline",
    to: "/apps/chat",
  },
  {
    icon: "mdi-calendar",
    title: "Calendario",
    to: "/apps/fullcalendar",
  },
  {
    title: "Productos",
    icon: "mdi-shopping",
    to: "/apps/shop",
  },
  {
    title: "Directorio telefónico",
    icon: "mdi-phone-classic",
    to: "/apps/contact",
  },
  {
    title: "Lista de contactos",
    icon: "mdi-phone",
    to: "/apps/contact-list",
  },
  {
    title: "Proveedores",
    icon: "mdi-phone-voip",
    to: "/apps/contact-grid",
  },
  {
    title: "Email",
    icon: "mdi-email",
    to: "/apps/email/inbox",
  },
  {
    title: "Qué hacer?",
    icon: "mdi-playlist-plus",
    to: "/apps/todo",
  },
  { header: "Components" },
  {
    group: "/components",
    model: false,
    icon: "mdi-animation",
    title: "Ui Components",
    children: [
      {
        title: "Alerts",
        icon: "mdi-alert",
        to: "alerts",
      },
      {
        title: "Avatar",
        icon: "mdi-account-circle",
        to: "avatar",
      },
      {
        title: "Badge",
        icon: "mdi-relative-scale",
        to: "badge",
      },
      {
        title: "Banner",
        icon: "mdi-box-shadow",
        to: "banner",
      },
      {
        title: "Appbar",
        icon: "mdi-arrange-bring-to-front",
        to: "appbar",
      },
      {
        title: "Toolbar",
        icon: "mdi-table-column-plus-after",
        to: "toolbar",
      },
      {
        title: "Systembar",
        icon: "mdi-format-float-left",
        to: "systembar",
      },
      {
        title: "Bottom Navigation",
        icon: "mdi-border-bottom",
        to: "bottomnavigation",
      },
      {
        title: "Bottomsheet",
        icon: "mdi-format-wrap-top-bottom",
        to: "bottomsheet",
      },
      {
        title: "Breadcrumb",
        icon: "mdi-equal",
        to: "breadcrumb",
      },
      {
        title: "Buttons",
        icon: "mdi-toggle-switch",
        to: "buttons",
      },
      {
        title: "Fab",
        icon: "mdi-react",
        to: "fab",
      },
      {
        title: "Cards",
        icon: "mdi-cards-outline",
        to: "cards",
      },
      {
        title: "Carousel",
        icon: "mdi-view-carousel",
        to: "carousel",
      },
      {
        title: "Chips",
        icon: "mdi-checkbox-multiple-blank-outline",
        to: "chips",
      },
      {
        title: "Dialogs",
        icon: "mdi-tablet",
        to: "dialogs",
      },
      {
        title: "Dividers",
        icon: "mdi-bandcamp",
        to: "dividers",
      },
      {
        title: "Expansion Panel",
        icon: "mdi-credit-card-multiple",
        to: "expansionpanel",
      },
      {
        title: "Footer",
        icon: "mdi-view-agenda",
        to: "footer",
      },
      {
        title: "Overflow Buttons",
        icon: "mdi-window-open",
        to: "overflow-buttons",
      },
      {
        title: "Grids",
        icon: "mdi-grid",
        to: "grids",
      },
      {
        title: "Button Group",
        icon: "mdi-hexagon-multiple",
        to: "button-group",
      },
      {
        title: "Chip Group",
        icon: "mdi-image-filter-vintage",
        to: "chip-group",
      },
      {
        title: "Item Group",
        icon: "mdi-layers",
        to: "item-group",
      },
      {
        title: "List Item Group",
        icon: "mdi-playlist-plus",
        to: "listitem-group",
      },
      {
        title: "Slide Group",
        icon: "mdi-recycle",
        to: "slide-group",
      },
      {
        title: "Windows",
        icon: "mdi-window-maximize",
        to: "windows",
      },
      {
        title: "Hover",
        icon: "mdi-white-balance-sunny",
        to: "hover",
      },
      {
        title: "Icons",
        icon: "mdi-unity",
        to: "icons",
      },
      {
        title: "Images",
        icon: "mdi-image-area",
        to: "images",
      },
  
      {
        title: "Menus",
        icon: "mdi-launch",
        to: "menus",
      },
      {
        title: "Navigation Drawers",
        icon: "mdi-image-broken-variant",
        to: "navigation-drawers",
      },
      {
        title: "Overlay",
        icon: "mdi-arrange-bring-forward",
        to: "overlay",
      },
      {
        title: "Pagination",
        icon: "mdi-book-open-variant",
        to: "pagination",
      },
      {
        title: "Parallex",
        icon: "mdi-book-plus",
        to: "parallex",
      },
      {
        title: "Color Pickers",
        icon: "mdi-grease-pencil",
        to: "color-pickers",
      },
      {
        title: "Date Pickers",
        icon: "mdi-calendar-multiple",
        to: "date-pickers",
      },
      {
        title: "Time Pickers",
        icon: "mdi-clock-fast",
        to: "time-pickers",
      },
      {
        title: "Progress Circular",
        icon: "mdi-compass",
        to: "progress-circular",
      },
      {
        title: "Progress Linear",
        icon: "mdi-crosshairs",
        to: "progress-linear",
      },
      {
        title: "Rating",
        icon: "mdi-star-circle",
        to: "rating",
      },
      {
        title: "Sheet",
        icon: "mdi-table-large",
        to: "sheet",
      },
      {
        title: "SkeletonLoaders",
        icon: "mdi-television-guide",
        to: "skeleton-loaders",
      },
      {
        title: "Snackbar",
        icon: "mdi-trello",
        to: "snackbar",
      },
      {
        title: "Sparkline",
        icon: "mdi-chart-areaspline",
        to: "sparkline",
      },
      {
        title: "Steppers",
        icon: "mdi-chart-gantt",
        to: "steppers",
      },
      {
        title: "Subheaders",
        icon: "mdi-clipboard-outline",
        to: "subheaders",
      },
      {
        title: "Tabs",
        icon: "mdi-sort-variant",
        to: "tabs",
      },
      {
        title: "Timeline",
        icon: "mdi-clock-end",
        to: "timeline",
      },
      {
        title: "Tooltips",
        icon: "mdi-image-filter-vintage",
        to: "tooltips",
      },
      {
        title: "Treeview",
        icon: "mdi-webhook",
        to: "treeview",
      },
    ],
  },
  {
    group: "/style-animation",
    model: false,
    icon: "mdi-palette",
    title: "Style & Animation",
    children: [
      {
        title: "Colors",
        icon: "mdi-format-color-fill",
        to: "colors",
      },
      {
        title: "Content",
        icon: "mdi-blur-linear",
        to: "content",
      },
      {
        title: "Display",
        icon: "mdi-application",
        to: "display",
      },
      {
        title: "Elevation",
        icon: "mdi-assistant",
        to: "elevation",
      },
      {
        title: "Flex",
        icon: "mdi-box-cutter",
        to: "flex",
      },
      {
        title: "Float",
        icon: "mdi-alpha",
        to: "float",
      },
      {
        title: "Spacing",
        icon: "mdi-bridge",
        to: "spacing",
      },
      {
        title: "Text",
        icon: "mdi-bowling",
        to: "text",
      },
      {
        title: "Typography",
        icon: "mdi-sort",
        to: "typography",
      },
      {
        title: "Transitions",
        icon: "mdi-text-shadow",
        to: "transitions",
      },
    ],
  },
  { header: "Charts" },
  {
    group: "/charts",
    model: false,
    icon: "mdi-chart-bar",
    title: "Charts",
    children: [
      {
        title: "ApexCharts",
        icon: "mdi-chart-arc",
        to: "apexcharts",
      },
    ],
  },
  { header: "Forms" },
  {
    group: "/form-elements",
    model: false,
    icon: "mdi-collage",
    title: "Form Elements",
    children: [
      {
        title: "Autocompletes",
        icon: "mdi-adjust",
        to: "feautocompletes",
      },
      {
        title: "Combobox",
        icon: "mdi-adjust",
        to: "fecombobox",
      },
      {
        title: "File Inputs",
        icon: "mdi-adjust",
        to: "fefileinputs",
      },
      {
        title: "Inputs",
        icon: "mdi-adjust",
        to: "feinputs",
      },
      {
        title: "Overflow Buttons",
        icon: "mdi-adjust",
        to: "feoverflowbuttons",
      },
      {
        title: "Selection Controls",
        icon: "mdi-adjust",
        to: "feselectioncontrols",
      },
      {
        title: "Selects",
        icon: "mdi-adjust",
        to: "feselects",
      },
      {
        title: "Sliders",
        icon: "mdi-adjust",
        to: "fesliders",
      },
      {
        title: "Textareas",
        icon: "mdi-adjust",
        to: "fetextareas",
      },
      {
        title: "Textfields",
        icon: "mdi-adjust",
        to: "fetextfields",
      },
    ],
  },
  {
    group: "/form-layouts",
    model: false,
    icon: "mdi-checkbox-multiple-blank-outline",
    title: "Form Layouts",
    children: [
      {
        title: "Form Action",
        icon: "mdi-adjust",
        to: "flformaction",
      },
      {
        title: "Form Basic",
        icon: "mdi-adjust",
        to: "flformbasic",
      },
      {
        title: "Form Wizard",
        icon: "mdi-adjust",
        to: "formwizard",
      },
      {
        title: "Form Horizontal",
        icon: "mdi-adjust",
        to: "flformhorizontal",
      },
      {
        title: "Form Validation",
        icon: "mdi-adjust",
        to: "formvalidation",
      },
    ],
  },
  { header: "Widgets" },
  {
    title: "Drag n Drop",
    icon: "mdi-package-variant-closed",
    to: "/extra-components/dragndrop",
  },
  {
    title: "Lists",
    icon: "mdi-format-list-bulleted-type",
    to: "/components/lists",
  },
  { header: "Tables" },
  {
    title: "Simple Table",
    icon: "mdi-table",
    to: "/tables/tablesimple",
  },
  {
    title: "Datatable",
    icon: "mdi-table-column-width",
    to: "/tables/tabledatatable",
  },
  {
    title: "Data Iterators",
    icon: "mdi-table-edit",
    to: "/tables/tabledataiterators",
  },
  { header: "Extra" },
  {
    group: "/authentication",
    model: false,
    icon: "mdi-lock",
    title: "Authentication",
    children: [
      {
        title: "Boxed Login",
        icon: "mdi-chart-arc",
        to: "boxedlogin",
      },
      {
        title: "Login",
        icon: "mdi-chart-arc",
        to: "fulllogin",
      },
      {
        title: "Boxed Register",
        icon: "mdi-chart-arc",
        to: "boxedregister",
      },
      {
        title: "Register",
        icon: "mdi-chart-arc",
        to: "fullregister",
      },
      {
        title: "Error",
        icon: "mdi-chart-arc",
        to: "error",
      },
    ],
  },
  {
    group: "/icons",
    model: false,
    icon: "mdi-face",
    title: "Icons",
    children: [
      {
        title: "Material",
        icon: "mdi-chart-arc",
        to: "materialicons",
      },
      {
        title: "Font Awesome",
        icon: "mdi-chart-arc",
        to: "fontawesomeicons",
      },
      {
        title: "Themify",
        icon: "mdi-chart-arc",
        to: "themifyicons",
      },
      {
        title: "Simple line",
        icon: "mdi-chart-arc",
        to: "simplelineicons",
      },
    ], 
  },
  
  */
  
 ];
 