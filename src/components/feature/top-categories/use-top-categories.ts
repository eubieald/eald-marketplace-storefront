'use client';

import { useEffect, useState } from 'react';

export function useTopCategories() {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  function handleToggle(categoryId: string | null, openOnHover?: boolean) {
    if (openOnHover) {
      setOpenCategoryId(categoryId);
      return;
    }

    // toggle logic for clicks
    setOpenCategoryId((prev) =>
      prev === categoryId || categoryId === null ? null : categoryId
    );
  }

  function useIsTouchDevice() {
    const [isTouch, setIsTouch] = useState(false);
    useEffect(() => {
      setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);
    return isTouch;
  }

  return {
    openCategoryId,
    handleToggle,
    useIsTouchDevice,
  };
}
