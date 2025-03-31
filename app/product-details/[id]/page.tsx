
import ProductBanner from '../componnents/ProductBanner';
import BreadCrump from '../../_commponents/BreadCrump'

export default async function Page({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params;
    

    return <div className='px-10 py-8 md:px28'>
              <BreadCrump id={id}/>
              <div className="mt-10">
                <ProductBanner id={id}/>
                
              </div>
            </div>
  }