// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { Teacher } from "@/lib/api";
// import Link from "next/link";

// import { useFavoritesStore } from "@/lib/stores/favoritesSlice";

// interface CamperCardProps {
//   item: Camper;
// }

// const CamperCard = ({ item }: CamperCardProps) => {
//   const items = useFavoritesStore((state) => state.items);
//   const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     const frame = requestAnimationFrame(() => {
//       setMounted(true);
//     });
//     return () => cancelAnimationFrame(frame);
//   }, []);

//   const isFavorite = items.includes(item.id);
//   const activeFavorite = mounted && isFavorite;

//   const handleFavoriteClick = () => {
//     toggleFavorite(item.id);
//   };

//   const tags = [
//     {key: "transmission", label: item.transmission.charAt(0).toUpperCase() + item.transmission.slice(1), icon: "icon-automatic"},
//     { key: "engine", label: item.engine.charAt(0).toUpperCase() + item.engine.slice(1), icon: "icon-petrol" },
//     ...equipmentFilters
//     .filter(filter => filter.id !== "transmission")
//     .filter(filter => item[filter.id as keyof Camper] === true)
//     .map(filter => ({
//       key: filter.id,
//       label: filter.label,
//       icon: `icon-${filter.id.toLowerCase()}`
//     }))
//   ];

//   return (
//     <li className={css.card}>
//       <div className={css.imageWrapper}>
//         <Image
//           src={item.gallery[0]?.thumb ?? "/images/default-camper.jpg"}
//           alt={item.name}
//           fill
//           className={css.image}
//         />
//       </div>

//       <div className={css.content}>
//         <div className={css.header}>
//           <h2 className={css.name}>{item.name}</h2>
//           <div className={css.priceWrapper}>
//             <span className={css.price}>€{item.price.toFixed(2)}</span>
//             <button
//               aria-label={activeFavorite ? "Remove from favorites" : "Add to favorites"}
//               type="button"
//               className={`${css.favoriteBtn} ${activeFavorite ? css.active : ""}`}
//               onClick={handleFavoriteClick}
//             >
//               <svg width="26" height="24" className={css.heartIcon}>
//                 <use href="/icons/sprite.svg#icon-heart" />
//               </svg>
//             </button>
//           </div>
//         </div>
//         <div className={css.subHeader}>
//           <div className={css.ratingWrapper}>
//             <svg width="16" height="16" className={css.starIcon}>
//               <use href="/icons/sprite.svg#icon-star" />
//             </svg>
//             <span className={css.ratingText}>
//               {item.rating} ({item.reviews.length} Reviews)
//             </span>
//           </div>
//           <div className={css.locationWrapper}>
//             <svg width="16" height="16" className={css.mapIcon}>
//               <use href="/icons/sprite.svg#icon-map" />
//             </svg>
//             <span>{item.location}</span>
//           </div>
//         </div>

//         <p className={css.description}>{item.description}</p>

//         <ul className={css.tagsList}>
//           {tags.map((tag) => (
//             <li key={tag.key} className={css.tag}>
//               <svg width="20" height="20">
//                 <use href={`/icons/sprite.svg#${tag.icon}`} />
//               </svg>
//               <span>{tag.label}</span>
//             </li>
//           ))}
//         </ul>

//         <Link href={`/catalog/${item.id}`} className={css.showMoreBtn}>
//           Show more
//         </Link>
//       </div>
//     </li>
//   );
// };

// export default CamperCard;