/* Nextjs Portfolio Template
   This program is a template designed for creating dynamic portfolios using Next.js.
   Copyright (C) 2024 tyaP

   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU Affero General Public License as published by
   the Free Software Foundation, either version 3 of the License, or
   (at your option) any later version.

   This program is distributed in the hope that it will be useful,
   but WITHOUT ANY WARRANTY; without even the implied warranty of
   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
   GNU Affero General Public License for more details.

   You should have received a copy of the GNU Affero General Public License
   along with this program.  If not, see <https://www.gnu.org/licenses/>.

   For questions or support, please contact me at:
   Email: hi@tyap.me
   Website: https://www.tyap.me/
   Repository: https://github.com/mattyapotato/next_portfolio_template
*/

"use client";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

export default function PGPKey() {
    const [copied, setCopied] = useState(false);
    const PGP =
        "-----BEGIN PGP PUBLIC KEY BLOCK-----\n\n" +
        "xsFNBGZZYl8BEAC/XzF9VqRr3kUKnlDHOvhbVngiBRG2Io3EyBnKAMYlV9swYSws TJakeNuhlx8qAligV7/ib8Ab3APaLfk5iTfTzXZ5Y6/Xw+z9QqRb1dQnHVJITcPQ iRybQcOcV3Fa+nksuhYyuDfjonSWOHLobpGmv1dxzqj5+7cuRyTrQD+/2YS5tu/j 77jxMgGPmKcPF279wydUy/iuv8TBWTttQh4v4iLeNpMvTr5nwFHhvs8mUbbN2DvQ dydhDxugTWXljA2Nb3hyeTR2HtPAqr6GdLNNnTJoDQyobuwoHghKPYNgLhHGc4Gq gO1OORUEdzCfaEtsNtSCS87Oy3IbRbjiTGnvPIifRm/4LwlI1Us6pPnMGgWiqKTg YsufMsTggcR3ba/gQlahJ2K39fAEEc2jkCMfGs350H0DoJ8x+eoF+FnkpIHFn9kH 22vlUYNOEo5GiByXSf6bAltskt3E8CFpkCxHnKVU+J+6CCWlaGO2dFZK/NqFRiwd IHdANrwYbgjB0DIcm+Ey0ierI2q+p42zjElSoZn3rflCQgaaz7fHiLOzCCb8UqVj kpmYgV46OAGzcGHUWs44hrpaLbOmFgrxlTnHYS5uzBn+5d62dBGjHs5QspTRLyME qfywzVQvz1v5HQArJBQ6I0js73Dvc2ocSsTWZgX7G4DilNcYyEcn/QXodwARAQAB zRF0eWFQIDxoaUB0eWFwLm1lPsLBhwQTAQgAMRYhBIkyCY8dsb9V29EQ00opquKF d6U6BQJmWWJiAhsDBAsJCAcFFQgJCgsFFgIDAQAACgkQSimq4oV3pTrEWw/+Nz5+ 0jIZ/oZkp/deseb2n585VcCAlfdI76nTVQhNr3DQIpqt3QWlQoyFamMvgK5FSvLL K0BzAiIcL/JszWtl3O76cGCntv3nGUMYHe19xC67A5rrAjXloO1LSyYwdxehKiRJ porW+3S/sjW+a3Yg/GVixvvoQSb72YDIlQHew3F2/+nOZt80CT1XNsNnWxJGQifv BOPJAxSDctbbfmKrqiY+k5FDNDtrWU0Qj8mXxkk+UVcjaJVrU3T6a49c/2ui4mrf kDXCEfxyH9xE2+4AQ7dfaYISF4ouHbWseH/cVCbS/Sg2a14NUQbJ+wjtwo+G9gva JKWZ97VzqbbcoP2HOGJyBvoO3PA4OJIhsvPwCU3ULGVBXhQvIiDRKVY8iq3XIvRk O/1/ANrDE7acqOJeOWpsxZAG6DyKUkzfnnNbu7MMVJI51NblwHQBY9G6rZkn2PA9 ggXei4L0GauPN8u4ii8sys7yDjjYC9CwAOPIWEDlvCnUaC2ADuwglKE0imQbOmdb Lv0Q+eqEFMxL+NeF6kGv76B/OW9sK+0UT+KMdJBseOpsiWKiIkMRuETUNP/G8tZ4 UfZn5f0JnGqCQk/TXVTh7JyVRjXL63FgSI3lu0VEZT515x7IV7egmx3auGtZYiAN d7gYexwbPbhioKH1GwFJ5WkTiFA22U0Zb84xgTvOwU0EZlliYwEQANsgP0qZD1iv panJq5X4fSqIVkrG3qNMLbsRo4Qv/1/mce56UlazMQ9+MQtjAbE6Ji1/PCLvtb1j hvjNE63Rf0MQKy7BsEO2S4sirORavpeNO4iy0IQjUNMsFMkbCPzScydNHb0mTqxU 1y7u87o6vdGIOeXRNi3TT3A0ytJOr84umn2s51K2Zzzl/88jXrwP+j3lumOC9eJ7 78Vck0Yko3uewEdVFaq/1gn03tHtv25L1JHyWZpvIKasuSNKKF9N09HX4UeQ49nG IvkqZ2rLQn338YWh+SqtgNZYAB8LWogMgZoxY0AnAuPE0Bz/u7VIDGVajLzfBpII TjHagM853CPSbZxX7KeV9pzp1qMnO793i7ogT57ofw1p1Aj2UoZHBUmbDmPBjziJ wx2wi9SCDVLO0v0vaV0hkdLDb/4NvLBG0FTe7n0L1LXbYgzqUs2VDLyzu2szqqOD dSo/1ZWVlJ+A5SvqqY1SRVSqyenTLii7ktccRrDMQn8Wf4e6XNk60pGzSo5EctGu hhrAT+571j4d5I+O00OUHqGMUbhtf+WaGi+nxYJ8WtpObh6rJMIaBo5PoVXN5c3E cabTfVBQJHGMnRYBu/t+an3iAMG0m15OV1fBnnQnF6xvWGEBgMgilupu3KMsKiC3 FbctIjXIE1sCmZRVWGhaZcqsuPLbJ82jABEBAAHCwXYEGAEIACAWIQSJMgmPHbG/ VdvRENNKKarihXelOgUCZlliZQIbDAAKCRBKKarihXelOu02EAC2Z6Ft/FheoGZI +M0jsnhoqds/APShm066k008k5q9aEA55Q/Ew2lRiuhDORldzYzdd29LkpxZelUr kk6sP2v6mpQkwrLQ3EIMnIA0+SoJ2sWHGftuEa9pBJ/uFgxN/WlSJ0LcFZeOIOIl OMSCHmjWUXT8IlpqjP32zCKt3CqImDPrbLmP/k951ArjYA7qdoU6x2HUJwuR5Q7Q o7oyxUQhc94eBYKNs8M6ZquBvmBfejA5ROejkfzxOlyfJ0ZnMp3/HXSu5V8eVtZ1 BMQjyaTOcgYPeAynBQoO2So/KNjjr5qlAVMrd4/IaBJ1j6ya9qcYy6PudwQ6gN21 IV2nqui2qZ9wciQczurFR6uCyzL/kltyn6BHs12Vwv3ZJqaUSpM8F2Vzg6DsnNXV L+Zv/qr/I+xCedxPtC8UVCGuzrV/qDMejURON4dOjr6TDzqewMCKKvhr3XFqVjOB jlzkurSDFDvlSnU6VLCTYgq/sTKuwr7C9TvFMVwfnBD+K8aqPTYNFct4kTPNjct4 dt2eE3lOfRgM9ArrpXCYykiiMbfpI82obYWI4brnMO01pb3U/ur2hrxovzHjPrkS CNgId2nPCx2uaVtAoxQdP43cnr7i2Ns58YOYpgzGgeR4HXh/55ervnJkR1waVlDJ t4nVv1wEKSz1LiuMVS+83ZzSQodjdA== =3ajP" + // Full PGP key here
        "\n\n-----END PGP PUBLIC KEY BLOCK-----"

    const handleCopy = () => {
        navigator.clipboard.writeText(PGP)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
            });
    };
    const t = useTranslations('PGPKey');

    return (
        <section className="bg-muted py-6">
            <div className="container mx-auto px-4 md:px-6 max-w-[800px] word-wrap-break-word">
                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            {t('title')}
                        </h2>
                        <p className="text-muted-foreground">
                            {t('subtitle')}
                        </p>
                        <div className="mt-1">
                            <div className="bg-background rounded-lg shadow-md flex-grow container mx-auto p-4">
                                <div className="p-4 rounded-md bg-muted">
                                    <code className="font-mono text-sm">
                                        Pk algo: RSA
                                        <br />
                                        Pk size: 4096 bits
                                        <br />
                                        Fingerprint: 8932 098F 1DB1 BF55 DBD1 10D3 4A29 AAE2 8577 A53A
                                        <br />
                                        KeyID: 0x4A29AAE28577A53A
                                        <br />
                                        UserID: tyaP {"<"}hi@tyap.me{">"}
                                        <br />
                                    </code>
                                </div>
                                <div className="p-4 mt-4 rounded-md bg-muted">
                                    <code className="font-mono text-sm" dangerouslySetInnerHTML={{ __html: PGP.replace(/\n/g, "<br />") }} />
                                    <div className="mt-2 flex justify-end">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-muted-foreground hover:text-foreground"
                                            onClick={handleCopy}
                                        >
                                            {!copied && <Copy className="h-5 w-5" />}
                                            {copied && <Check className="h-7 w-7" />}
                                            <span className="sr-only">Copy PGP Key</span>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
}