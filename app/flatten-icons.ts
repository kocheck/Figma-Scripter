// ==========
// Written by Alex Lockwood https://github.com/alexjlockwood
// "Flattens all components in a Figma file.
// Note that this script assumes that
//   (1) every component in the file is an icon,
//   (2) each icon contains a single color, and
//   (3) the icons don't use masks.
// The `figma.flatten` function may not work as you expect if one of these conditions aren't met."
// ==========


// Create a list of all component nodes in the Figma file.
const componentNodes = figma.root.children.flatMap(pageNode => {
    return pageNode.findAll(node => node.type === 'COMPONENT');
  }) as readonly ComponentNode[];

  // Create a list of component nodes that have more than one child node.
  const unflattenedComponentNodes = componentNodes.filter(componentNode => {
    const childrenNodes = componentNode.findAll(() => true);
    return childrenNodes.length > 1;
  });

  // Flatten each component node's children into a single node.
  unflattenedComponentNodes.forEach(node => figma.flatten(node.children, node));

  figma.notify(`✅ Flattened ${unflattenedComponentNodes.length} icon(s)`);