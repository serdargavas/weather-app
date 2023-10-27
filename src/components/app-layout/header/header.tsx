import { socialItems } from "@/utils/helpers/social-contact.helper";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const Header: FC = () => {
  const { t } = useTranslation();

  return (
    <header className="h-14 md:h-12 bg-slate-200 flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center px-2 md:px-4 lg:px-8 gap-y-3">
      <div className="text-slate-950">{t("weatherApp")}</div>
      <div className="flex flex-row justify-center items-center gap-x-7">
        <div>Serdar Gavas</div>
        <div className="flex flex-row justify-center items-center gap-x-5">
          {socialItems.map((s) => (
            <Link key={s.url} href={s.url} rel="noreferrer" target="_blank">
              <Image src={s.image} width={30} height={30} alt="social-icon" />
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
