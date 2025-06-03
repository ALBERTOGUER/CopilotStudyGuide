# Guía de Patrones de Diseño en JavaScript y React

Esta guía explica patrones de diseño comunes en JavaScript y React, con ejemplos prácticos, para qué sirven y casos de uso reales.

---

## 1. Singleton
**Propósito:** Garantizar que una clase tenga solo una instancia y proporcionar un punto de acceso global.

**Ejemplo (JavaScript):**
```js
class Config {
  constructor() {
    if (Config.instance) return Config.instance;
    Config.instance = this;
    this.value = 'configuración';
  }
}
const a = new Config();
const b = new Config();
console.log(a === b); // true
```
**Uso:** Configuración global, conexión a base de datos.
**Caso real:**
- Un archivo de configuración de la app, o un gestor de logs que debe ser único en toda la aplicación.

---

## 2. Factory
**Propósito:** Crear objetos sin especificar la clase exacta.

**Ejemplo:**
```js
function UserFactory(type) {
  if (type === 'admin') return { role: 'admin', permissions: ['all'] };
  if (type === 'guest') return { role: 'guest', permissions: [] };
}
const user = UserFactory('admin');
```
**Uso:** Crear diferentes tipos de usuarios, componentes dinámicos.
**Caso real:**
- Crear instancias de diferentes tipos de botones o inputs en un formulario dinámico.

---

## 3. Observer (Publicador/Suscriptor)
**Propósito:** Permitir que objetos se suscriban a eventos y reciban notificaciones.

**Ejemplo:**
```js
class EventEmitter {
  constructor() { this.events = {}; }
  on(event, fn) { (this.events[event] ||= []).push(fn); }
  emit(event, data) { (this.events[event] || []).forEach(fn => fn(data)); }
}
const em = new EventEmitter();
em.on('msg', txt => console.log('Mensaje:', txt));
em.emit('msg', '¡Hola!');
```
**Uso:** Sistemas de eventos, Redux store, actualizaciones de contexto en React.
**Caso real:**
- Notificar a varios componentes cuando cambia el estado global (como en Redux o contextos de React).

---

## 4. Módulo
**Propósito:** Encapsular código y exponer solo lo necesario.

**Ejemplo (ES6):**
```js
// math.js
export function suma(a, b) { return a + b; }
// main.js
import { suma } from './math.js';
```
**Uso:** Organización de código reutilizable.
**Caso real:**
- Librerías de utilidades, helpers, servicios de API.

---

## 5. Higher-Order Component (React)
**Propósito:** Reutilizar lógica de componentes envolviendo uno y devolviendo otro.

**Ejemplo:**
```jsx
function withLogger(Wrapped) {
  return function(props) {
    console.log('Renderizando', Wrapped.name);
    return <Wrapped {...props} />;
  };
}
const Enhanced = withLogger(MyComponent);
```
**Uso:** Logging, autenticación, theming.
**Caso real:**
- Añadir control de permisos o logging a cualquier componente de la app sin modificar su código.

---

## 6. Render Props (React)
**Propósito:** Compartir lógica entre componentes usando una prop que es función.

**Ejemplo:**
```jsx
function MouseTracker({ children }) {
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  return <div onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>{children(pos)}</div>;
}
// Uso: <MouseTracker>{pos => <span>{pos.x}, {pos.y}</span>}</MouseTracker>
```
**Uso:** Personalizar renderizado, tooltips, modals.
**Caso real:**
- Mostrar un tooltip o menú contextual en la posición del mouse.

---

## 7. Compound Component (React)
**Propósito:** Permitir que varios componentes trabajen juntos y compartan estado implícitamente.

**Ejemplo:**
```jsx
function Tabs({ children }) {
  const [active, setActive] = React.useState(0);
  return React.Children.map(children, (child, i) =>
    React.cloneElement(child, { isActive: i === active, onClick: () => setActive(i) })
  );
}
function Tab({ isActive, onClick, children }) {
  return <button style={{ fontWeight: isActive ? 'bold' : 'normal' }} onClick={onClick}>{children}</button>;
}
// Uso: <Tabs><Tab>Uno</Tab><Tab>Dos</Tab></Tabs>
```
**Uso:** Tabs, acordeones, menús.
**Caso real:**
- Un sistema de pestañas (tabs) donde cada tab y su contenido se comunican automáticamente.

---

## 8. Custom Hook (React)
**Propósito:** Encapsular lógica reutilizable para componentes funcionales.

**Ejemplo:**
```jsx
function useLocalStorage(key, initial) {
  const [value, setValue] = React.useState(() => {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });
  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}
```
**Uso:** Manejo de formularios, fetch, sincronización de estado.
**Caso real:**
- Guardar el estado de un formulario en localStorage para persistencia entre recargas.

---

## 9. Strategy
**Propósito:** Definir una familia de algoritmos y hacerlos intercambiables.

**Ejemplo:**
```js
const estrategias = {
  suma: (a, b) => a + b,
  mult: (a, b) => a * b,
};
function calcular(tipo, a, b) {
  return estrategias[tipo](a, b);
}
calcular('suma', 2, 3); // 5
```
**Uso:** Ordenar, filtrar, formatear datos.
**Caso real:**
- Cambiar el algoritmo de ordenamiento de una tabla según la preferencia del usuario.

---

## 10. Proxy
**Propósito:** Controlar el acceso a un objeto.

**Ejemplo:**
```js
const user = { nombre: 'Ana' };
const proxy = new Proxy(user, {
  get(target, prop) {
    if (prop === 'nombre') return target[prop].toUpperCase();
    return target[prop];
  },
});
console.log(proxy.nombre); // 'ANA'
```
**Uso:** Validación, logging, control de acceso.
**Caso real:**
- Validar acceso a propiedades sensibles o transformar datos al accederlos.

---

## 11. Adapter
**Propósito:** Permitir que interfaces incompatibles trabajen juntas.

**Ejemplo:**
```js
class OldApi { getData() { return 'old'; } }
class NewApi { fetch() { return 'new'; } }
function getDataFromApi(api) {
  if (api.fetch) return api.fetch();
  if (api.getData) return api.getData();
}
```
**Uso:** Integrar código legado con sistemas nuevos.
**Caso real:**
- Usar una API antigua en un sistema moderno sin modificar el código original.

---

## 12. Decorator (JS/React)
**Propósito:** Agregar comportamiento a objetos/componentes sin modificar su estructura.

**Ejemplo:**
```jsx
function withBorder(Component) {
  return props => <div style={{ border: '1px solid red' }}><Component {...props} /></div>;
}
```
**Uso:** Añadir UI, logging, permisos.
**Caso real:**
- Añadir un borde o estilos extra a cualquier componente sin modificar su código fuente.

---

## 13. Command
**Propósito:** Encapsular una petición como objeto.

**Ejemplo:**
```js
class Command {
  constructor(execute) { this.execute = execute; }
}
const logCommand = new Command(() => console.log('¡Hola!'));
logCommand.execute();
```
**Uso:** Undo/redo, colas de tareas.
**Caso real:**
- Implementar un sistema de deshacer/rehacer en un editor de texto.

---

## Conclusión
Estos patrones ayudan a escribir código más mantenible, flexible y reutilizable en JavaScript y React. Elige el patrón adecuado según tu caso de uso y adapta los ejemplos a tus proyectos.
