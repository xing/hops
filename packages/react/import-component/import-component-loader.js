const regex = /importComponent\s*\(\s*\(\)\s+=>\s+import\(\s*'([^']+)'\s*\)\s*\)/g;

function importComponentLoader(source) {
  return source.replace(
    regex,
    "importComponent({ load: () => import('$1'), moduleId: require.resolveWeak('$1') })"
  );
}

module.exports = importComponentLoader;
