import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { useEffect } from "react";
import { MemoryRouter, useLocation, useNavigate } from "react-router";
import { App } from "@/app/app";

type Probe = {
  url: string;
  navigate: (to: string | number) => void;
};

/** Exposes the router's location and navigate() to tests. */
function RouterProbe({ onChange }: { onChange: (probe: Probe) => void }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    onChange({
      url: location.pathname + location.search,
      navigate: (to) => (typeof to === "number" ? navigate(to) : navigate(to)),
    });
  }, [onChange, location, navigate]);

  return null;
}

export function renderApp(initialUrl: string) {
  const queryClient = new QueryClient({
    defaultOptions: { mutations: { retry: false } },
  });
  let probe: Probe = { url: initialUrl, navigate: () => {} };
  const onChange = (next: Probe) => {
    probe = next;
  };

  const utils = render(
    <MemoryRouter initialEntries={[initialUrl]}>
      <QueryClientProvider client={queryClient}>
        <App />
        <RouterProbe onChange={onChange} />
      </QueryClientProvider>
    </MemoryRouter>,
  );

  return {
    ...utils,
    url: () => probe.url,
    navigate: (to: string | number) => probe.navigate(to),
  };
}
