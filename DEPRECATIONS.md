# Deprecated APIs

### DEP0001

`hops-config` is deprecated. Please use `ConfigContext` or the [`withConfig()`](https://github.com/xing/hops#withconfigcomponent) HOC from `hops` instead.

### DEP0003

The config property `shouldPrefetchOnServer` is deprecated and will be removed in favor of the property `allowServerSideDataFetching` in the next major release of Hops.

### DEP0004

Deep imports to `hops-react/lib/runtime` are deprecated and should be changed to `hops-react` instead.

### DEP0005

Returning warnings from `hops-doctor`'s `diagnose`-hook is deprecated. Please use the doctor's `pushWarning`- and `pushError`-functions instead.
