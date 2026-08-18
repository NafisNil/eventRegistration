import React from "react";

interface PartnerRecord {
  id: number;
  name: string;
  logo?: string | null;
  partnership_category?: {
    name?: string | null;
  } | null;
}

interface CategoryGroup {
  title: string;
  items: PartnerRecord[];
}

interface OrganizersSectionProps {
  partners?: PartnerRecord[];
}

const getPublicAssetUrl = (value?: string | null) => {
  if (!value) {
    return "";
  }

  return `/storage/${value.replace(/^\/+/, "")}`;
};

export const OrganizersSection: React.FC<OrganizersSectionProps> = ({ partners = [] }) => {
  const categories = React.useMemo<CategoryGroup[]>(() => {
    const grouped = new Map<string, PartnerRecord[]>();

    for (const partner of partners) {
      const categoryName = partner.partnership_category?.name || "General";
      const existing = grouped.get(categoryName) ?? [];
      existing.push(partner);
      grouped.set(categoryName, existing);
    }

    return Array.from(grouped.entries()).map(([title, items]) => ({ title, items }));
  }, [partners]);

  return (
    <section className="border-t border-emerald-100 bg-[#f7faf5] py-20 text-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700">Organisers & partners</span>
          <h2 className="mt-2 text-3xl font-bold text-slate-900">Delivered in partnership</h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <div key={category.title} className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">{category.title}</h3>
              <ul className="space-y-3">
                {category.items.map((partner: PartnerRecord) => {
                  const logoUrl = getPublicAssetUrl(partner.logo);

                  return (
                    <li key={partner.id} className="flex items-center gap-3 text-base font-medium text-slate-800 transition-colors">
                      {logoUrl ? (
                        <img
                          src={logoUrl}
                          alt={partner.name}
                          className="h-12 w-12 rounded-lg border border-emerald-100 bg-white object-contain p-1.5"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-xs font-semibold text-emerald-700">
                          {partner.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <span className="transition-colors hover:text-emerald-700">{partner.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};