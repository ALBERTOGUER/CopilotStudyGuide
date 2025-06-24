# Guía de Entrevista TypeScript

Esta guía cubre los temas más importantes de TypeScript para entrevistas técnicas, desde fundamentos hasta conceptos avanzados. Incluye explicaciones, ejemplos y ejercicios prácticos.

---

## 1. ¿Qué es TypeScript?

**Explicación:**
TypeScript es un superset de JavaScript que añade tipado estático y características avanzadas para el desarrollo a gran escala. Permite detectar errores en tiempo de compilación y mejora la mantenibilidad del código.

**Ventajas:**
- Detección temprana de errores
- Mejor autocompletado y documentación
- Facilita el refactorizado

---

## 2. Tipos Básicos

**Explicación:**
TypeScript añade tipos como `string`, `number`, `boolean`, `any`, `unknown`, `void`, `null`, `undefined`, `never`, y arrays.

**Ejemplo:**
```ts
let nombre: string = "Ana";
let edad: number = 30;
let activo: boolean = true;
let datos: any = {};
let lista: number[] = [1, 2, 3];
```

**Ejercicio:**
Declara variables para un usuario: nombre (string), edad (number), esAdmin (boolean).

---

## 3. Interfaces y Tipos Personalizados

**Explicación:**
Las interfaces y los tipos (`type`) permiten definir la forma de objetos y estructuras complejas.

**Ejemplo:**
```ts
interface Usuario {
  nombre: string;
  edad: number;
  esAdmin?: boolean;
}

const user: Usuario = { nombre: "Ana", edad: 30 };
```

**Ejercicio:**
Crea una interfaz para un producto con nombre, precio y stock opcional.

---

## 4. Funciones y Tipado de Parámetros

**Explicación:**
Puedes tipar los parámetros y el valor de retorno de las funciones.

**Ejemplo:**
```ts
function saludar(nombre: string): string {
  return `Hola, ${nombre}`;
}
```

**Ejercicio:**
Crea una función que reciba dos números y retorne su suma.

---

## 5. Generics

**Explicación:**
Los genéricos permiten crear componentes y funciones reutilizables para cualquier tipo de dato.

**Ejemplo:**
```ts
function identidad<T>(valor: T): T {
  return valor;
}
```

**Ejercicio:**
Crea una función genérica que reciba un array de cualquier tipo y retorne el primer elemento.

---

## 6. Clases y Herencia

**Explicación:**
TypeScript soporta clases, herencia, modificadores de acceso (`public`, `private`, `protected`) y abstracción.

**Ejemplo:**
```ts
class Animal {
  constructor(public nombre: string) {}
  mover() { console.log("Moviendo..."); }
}

class Perro extends Animal {
  ladrar() { console.log("Guau!"); }
}
```

**Ejercicio:**
Crea una clase `Persona` con propiedades y un método que imprima un saludo.

---

## 7. Tipos Avanzados

**Explicación:**
TypeScript incluye tipos avanzados como `union`, `intersection`, `literal types`, y utilidades como `Partial`, `Pick`, `Omit`.

### 1. Union Types (Uniones)
Permiten que una variable acepte varios tipos posibles.
```ts
type ID = string | number;
let userId: ID = "abc";
userId = 123;
```

### 2. Intersection Types (Intersecciones)
Combinan varios tipos en uno solo, que debe cumplir con todos.
```ts
type Persona = { nombre: string };
type Empleado = { empresa: string };
type Trabajador = Persona & Empleado;
const t: Trabajador = { nombre: "Ana", empresa: "Acme" };
```

### 3. Literal Types (Tipos literales)
Restringen el valor a un conjunto específico.
```ts
type Rol = "admin" | "user";
let rol: Rol = "admin";
// rol = "guest"; // Error
```

### 4. Utility Types (Tipos utilitarios)
TypeScript provee utilidades para manipular tipos:
- `Partial<T>`: Hace todas las propiedades opcionales.
- `Pick<T, K>`: Elige un subconjunto de propiedades.
- `Omit<T, K>`: Omite ciertas propiedades.

```ts
interface Producto { id: number; nombre: string; stock: number; }
const prod: Partial<Producto> = { nombre: "Camiseta" };
const prodPick: Pick<Producto, "id" | "nombre"> = { id: 1, nombre: "Camiseta" };
const prodOmit: Omit<Producto, "stock"> = { id: 1, nombre: "Camiseta" };
```

**Ejercicio:**
Crea un tipo que acepte solo los valores "admin" o "user".

---

## 8. Manipulación Avanzada de Tipos

**Explicación:**
Incluye mapped types, conditional types, infer, y template literal types.

**Ejemplo:**
```ts
type Readonly<T> = { readonly [P in keyof T]: T[P] };
type EsString<T> = T extends string ? true : false;
```

**Ejercicio:**
Crea un tipo que haga todas las propiedades de un objeto opcionales.

---

## 9. Integración con JavaScript y Migración

**Explicación:**
Puedes usar TypeScript en proyectos JavaScript existentes, migrando archivos `.js` a `.ts` gradualmente.

**Ejemplo:**
```ts
// archivo.js
function sumar(a, b) { return a + b; }
// archivo.ts
function sumar(a: number, b: number): number { return a + b; }
```

---

## 10. Buenas Prácticas y Preguntas de Entrevista

- Usa tipos explícitos siempre que sea posible
- Prefiere interfaces para objetos
- Aprovecha los genéricos y utility types

### Preguntas frecuentes de entrevista

**1. ¿Cuál es la diferencia entre `interface` y `type`?**
- `interface` se usa principalmente para describir la forma de objetos y puede ser extendida o implementada varias veces. `type` es más flexible, permite uniones, intersecciones y tipos primitivos, pero no puede ser reabierto para agregar nuevas propiedades.

**2. ¿Qué es el tipo `unknown` y en qué se diferencia de `any`?**
- `unknown` es un tipo seguro: obliga a hacer comprobaciones de tipo antes de operar con el valor. `any` desactiva el chequeo de tipos, permitiendo cualquier operación sin advertencias.

**3. ¿Cómo funciona el type narrowing?**
- Es el proceso de refinar el tipo de una variable usando condicionales (`typeof`, `instanceof`, comprobaciones de igualdad, etc.) para que TypeScript sepa qué operaciones son seguras.

**4. ¿Qué son los tipos literales y para qué sirven?**
- Permiten restringir el valor de una variable a un conjunto específico de valores, útil para validaciones y control de flujo.

**5. ¿Qué es un generic y por qué es útil?**
- Un generic es una forma de crear componentes o funciones que funcionan con cualquier tipo, permitiendo reutilización y seguridad de tipos.

**6. ¿Qué hace el utility type `Partial<T>`?**
- Convierte todas las propiedades de un tipo en opcionales. Útil para actualizaciones parciales de objetos.

**7. ¿Cómo se define un tipo para una función que recibe un callback?**
- Se puede usar una firma de función:
```ts
function procesar(callback: (valor: number) => void) { /* ... */ }
```

**8. ¿Qué es el type assertion y cuándo se usa?**
- Es una forma de decirle a TypeScript que trate un valor como un tipo específico, útil cuando el programador sabe más que el compilador:
```ts
const valor: any = "texto";
const longitud = (valor as string).length;
```

**9. ¿Cómo se puede evitar el error 'Object is possibly undefined'?**
- Usando el operador de encadenamiento opcional (`?.`) o comprobando explícitamente si el valor es `undefined` antes de acceder a sus propiedades.

**10. ¿Qué es el type guard personalizado?**
- Es una función que ayuda a TypeScript a refinar el tipo de una variable:
```ts
function esString(valor: unknown): valor is string {
  return typeof valor === "string";
}
```

---

**¡Éxito en tu entrevista!**
