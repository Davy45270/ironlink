# IHM Kanban (spécification rapide)

## Écran Board
- Header: Projet · Board selector · Recherche
- Toolbar: filtres (assignee, label, status), tri, vue (table)
- Colonnes (drag & drop) + WIP indicator
- Swimlanes (optionnelles)

## Carte Issue (tuiles)
- Titre + type (Epic/Story/Tâche)
- Priorité, assignee, labels
- Badges: SLA, bloqueur
- Actions rapides: assigner, changer priorité
- Organisation adaptée: Epic parent → Stories → Tâches (visuel hiérarchique)

## Actions clés
- Drag & drop (move)
- Création rapide (inline)
- Édition latérale (drawer)

## IHM Admin Board
- Édition colonnes + WIP
- Workflow & règles
- Gestion swimlanes

## Responsive (plan d’implémentation)
- **Mobile (<640px)** : 1 colonne à la fois (swipe horizontal ou select), header compact, bouton “+” flottant, cartes pleine largeur, drawer pour détails.
- **Tablet (640–1024px)** : 2–3 colonnes visibles, filtres en barre, détails en panneau latéral.
- **Desktop (≥1024px)** : 3+ colonnes, header complet, recherche + filtres, panneau détails fixe, drag & drop complet.

### Composants UI
- `KanbanPage`, `KanbanHeader`, `BoardViewport`, `Column`, `Card`, `CardDetailsPanel`
- `FiltersBar`, `ColumnSelector` (mobile), `DragLayer`, `Skeletons`, `EmptyState`

### CSS / Styling (exemples)
- Breakpoints `sm/md/lg`
- Grid : `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`, `gap-4`
- Overflow : `overflow-x-auto` + `snap-x` mobile
- Cards : `min-w-[260px]` mobile, `min-w-[300px]` desktop
- Panel : `fixed right-0 w-full md:w-[380px] lg:w-[420px]`
- A11y : focus visible, contrastes, zones touch ≥44px

### Critères d’acceptation (responsive + a11y)
- **Mobile** : navigation fluide entre colonnes, aucun overflow non voulu, drawer OK
- **Tablet** : 2–3 colonnes sans chevauchement, filtres utilisables
- **Desktop** : 3+ colonnes, DnD complet, détails persistants
- **Perf** : scrolling fluide, skeletons au chargement
- **A11y** : navigation clavier + ARIA DnD, contrastes conformes

## Tech
- Next.js/React
- DnD: @dnd-kit ou react-beautiful-dnd
- Optimistic UI + rollback sur erreur
