import React from "react";

const RouterContext = React.createContext(null);

function readLocation() {
  if (typeof window === "undefined") {
    return { pathname: "/", search: "", hash: "" };
  }
  return {
    pathname: window.location.pathname || "/",
    search: window.location.search || "",
    hash: window.location.hash || "",
  };
}

function toHref(to) {
  if (typeof to !== "string") return "/";
  if (to.startsWith("#")) {
    const current = readLocation();
    return `${current.pathname}${current.search}${to}`;
  }
  return to;
}

export function Router({ children }) {
  const [location, setLocation] = React.useState(readLocation);

  React.useEffect(() => {
    const onPopState = () => setLocation(readLocation());
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigate = React.useCallback((to, options = {}) => {
    const href = toHref(to);
    const url = new URL(href, window.location.origin);
    const next = `${url.pathname}${url.search}${url.hash}`;

    if (options.replace) {
      window.history.replaceState({}, "", next);
    } else {
      window.history.pushState({}, "", next);
    }

    setLocation({
      pathname: url.pathname || "/",
      search: url.search || "",
      hash: url.hash || "",
    });

    if (url.hash && url.pathname === window.location.pathname) {
      window.requestAnimationFrame(() => {
        const target = document.getElementById(url.hash.slice(1));
        target?.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.requestAnimationFrame(() => window.scrollTo(0, 0));
    }
  }, []);

  const value = React.useMemo(() => ({ ...location, navigate }), [location, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useLocation() {
  const context = React.useContext(RouterContext);
  if (!context) throw new Error("useLocation must be used inside <Router>.");
  return context;
}

export function useNavigate() {
  const context = React.useContext(RouterContext);
  if (!context) throw new Error("useNavigate must be used inside <Router>.");
  return context.navigate;
}

export function Link({ to, replace = false, children, onClick, ...props }) {
  const navigate = useNavigate();

  return (
    <a
      href={toHref(to)}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (
          event.defaultPrevented ||
          event.button !== 0 ||
          event.metaKey ||
          event.ctrlKey ||
          event.shiftKey ||
          event.altKey
        ) {
          return;
        }

        event.preventDefault();
        navigate(to, { replace });
      }}
    >
      {children}
    </a>
  );
}

export function Navigate({ to, replace = false }) {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(to, { replace });
  }, [navigate, replace, to]);

  return null;
}
